package com.ussf.dingo.service;

import com.ussf.dingo.model.User;
import com.ussf.dingo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        User encryptedUser = new User();
        encryptedUser.setUsername(user.getUsername());
        encryptedUser.setFirstName(user.getFirstName());
        encryptedUser.setLastName(user.getLastName());
        encryptedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(encryptedUser);
        return encryptedUser;
    }

    public boolean authenticate(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        System.out.println("gets authenticated0");

        if (userOptional == null) {
            System.out.println("User has not registered in the database");
            return false;
        }

        if(!userOptional.get().getUsername().equals(username)){
            System.out.println("User has not registered in the database");
            return false;
        }

        if (!passwordEncoder.matches(password, userOptional.get().getPassword())) {
            System.out.println("password2: " + password + ", " + userOptional.get().getPassword());
            return false;
        } else {
            System.out.println("password3: " + password + ", " + userOptional.get().getPassword());
        }

        return true;
    }
}
