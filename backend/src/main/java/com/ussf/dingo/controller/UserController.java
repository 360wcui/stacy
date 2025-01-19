package com.ussf.dingo.controller;

import com.ussf.dingo.model.LoginRequest;
import com.ussf.dingo.model.User;
import com.ussf.dingo.repository.UserRepository;
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

import java.util.Optional;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> registerUser(@RequestBody() User user){
        System.out.println(user.getFirstName() + "," + user.getLastName());
        User savedDncryptedUser = userService.registerUser(user);

        // Authenticate the user
        String jwt = authenticationHelper(user.getUsername(), user.getPassword());

        // Return the response with the JWT token
        System.out.println("gets registered");
        return ResponseEntity.status(HttpStatus.CREATED).body(new JwtResponse(jwt, savedDncryptedUser.getId()));
    }

    private String authenticationHelper(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Generate JWT token
        String jwt = jwtUtils.generateJwtToken(authentication);
        return jwt;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        try{
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(),loginRequest.getPassword());
            if (isAuthenticated){
                String jwt = authenticationHelper(loginRequest.getUsername(), loginRequest.getPassword());

                Optional<User> savedEncryptedUserOptional = userRepository.findByUsername(loginRequest.getUsername());
                if (savedEncryptedUserOptional.isPresent()) {
                    System.out.println("Login was successful" + jwt);

                    return ResponseEntity.ok(new JwtResponse(jwt, savedEncryptedUserOptional.get().getId()));
                } else {
                    System.out.println("Shall never be here");
                }
            } else {
                System.out.println("login was not successful");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse());
            }
        } catch (Exception e) {
            System.out.println("there is an error authenticarted");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JwtResponse());
    }
}
