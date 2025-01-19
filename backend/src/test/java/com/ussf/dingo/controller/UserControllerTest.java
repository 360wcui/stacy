package com.ussf.dingo.controller;

import com.ussf.dingo.model.User;
import com.ussf.dingo.security.JwtResponse;
import com.ussf.dingo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        testUser = new User(); // Create a test user
        testUser.setUsername("testuser");
        testUser.setPassword("password123");
    }

    @Test
    void testRegisterUser_Success() {
        // Arrange: mock the behavior of userService.registerUser
        when(userService.registerUser(any(User.class))).thenReturn(testUser);

        // Act: call the controller method
        ResponseEntity<JwtResponse> result = userController.registerUser(testUser);

        // Assert: verify the result
        assertNotNull(result);
        assertEquals("testuser", result.getBody().getUser().getUsername());
        assertEquals("password123", result.getBody().getUser().getPassword());

        // Verify that userService.registerUser was called exactly once
        verify(userService, times(1)).registerUser(any(User.class));
    }

    @Test
    void testRegisterUser_Failure() {
        // Arrange: mock the behavior of userService.registerUser to return null or throw an exception
        when(userService.registerUser(any(User.class))).thenThrow(new RuntimeException("Registration failed"));

        // Act & Assert: check that the controller handles the failure properly
        Exception exception = assertThrows(RuntimeException.class, () -> {
            userController.registerUser(testUser);
        });

        assertEquals("Registration failed", exception.getMessage());

        // Verify that userService.registerUser was called exactly once
        verify(userService, times(1)).registerUser(any(User.class));
    }
}