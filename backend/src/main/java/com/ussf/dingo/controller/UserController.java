package com.ussf.dingo.controller;

import com.ussf.dingo.model.LoginRequest;
import com.ussf.dingo.model.User;
import com.ussf.dingo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody() User user){
        System.out.println(user.getFirstName() + "," + user.getLastName());
        User encryptedUser = userService.registerUser(user);
        System.out.println("gets registered");
        return ResponseEntity.status(HttpStatus.CREATED).body(encryptedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try{
            System.out.println("password: " + loginRequest.getPassword() + ", " + loginRequest.getUsername());
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
            System.out.println("gets authenticated");
            if (isAuthenticated){
                System.out.println("authenticarted");
                session.setAttribute("user", loginRequest.getUsername());
                return ResponseEntity.ok("Login was successful!");
            } else {
                System.out.println("not authenticarted");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            System.out.println("there is an error authenticarted");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }
}
