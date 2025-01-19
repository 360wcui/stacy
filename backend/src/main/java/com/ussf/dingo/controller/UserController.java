package com.ussf.dingo.controller;

import com.ussf.dingo.model.User;
import com.ussf.dingo.service.UserService;
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
}
