package com.ussf.dingo.controller;

import com.ussf.dingo.model.LoginRequest;
import com.ussf.dingo.model.User;
import com.ussf.dingo.security.JwtResponse;
import com.ussf.dingo.security.JwtUtils;
import com.ussf.dingo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> registerUser(@RequestBody() User user){
        System.out.println(user.getFirstName() + "," + user.getLastName());
        User encryptedUser = userService.registerUser(user);

        // Authenticate the user
        System.out.println(user.getFirstName() + "," + user.getLastName() + "," + user.getPassword() + "," + user.getUsername());
        System.out.println(encryptedUser.getFirstName() + "," + encryptedUser.getLastName() + "," + encryptedUser.getPassword() + "," + encryptedUser.getUsername());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        System.out.println("gets here0" + encryptedUser.getFirstName() + "," + encryptedUser.getLastName());


        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("gets here1" + encryptedUser.getFirstName() + "," + encryptedUser.getLastName());


        // Generate JWT token
        String jwt = jwtUtils.generateJwtToken(authentication);
        System.out.println("gets here2" + encryptedUser.getFirstName() + "," + encryptedUser.getLastName());


        // Return the response with the JWT token
        System.out.println("gets registered");
        return ResponseEntity.status(HttpStatus.CREATED).body(new JwtResponse(jwt, encryptedUser));
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
