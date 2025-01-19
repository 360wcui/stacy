package com.ussf.dingo.service;

import com.ussf.dingo.model.User;
import com.ussf.dingo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

//    public User registerUser(User user) {
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return user;
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        System.out.println("gets authenticated0");

        if (user == null) {
            System.out.println("User has not registered in the database");
            return false;
        }

        if(!user.getUsername().equals(username)){
            System.out.println("User has not registered in the database");
            return false;
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("password2: " + password + ", " + user.getPassword());
            return false;
        } else {
            System.out.println("password3: " + password + ", " + user.getPassword());
        }

        return true;
    }
}
