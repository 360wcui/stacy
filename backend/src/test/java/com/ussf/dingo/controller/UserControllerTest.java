package com.ussf.dingo.controller;

import com.ussf.dingo.model.User;
import com.ussf.dingo.security.JwtResponse;
import com.ussf.dingo.security.JwtUtils;
import com.ussf.dingo.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;
    private User testUser;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        testUser = new User(); // Create a test user
        testUser.setId(2L);
        testUser.setPassword("password123");
    }

    @Test
    void testRegisterUser_Success() {
        // Arrange: mock the behavior of userService.registerUser
        when(userService.registerUser(any(User.class))).thenReturn(testUser);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(jwtUtils.generateJwtToken(any(Authentication.class))).thenReturn(null);

        // Act: call the controller method
        ResponseEntity<JwtResponse> result = userController.registerUser(testUser);

        // Assert: verify the result
        assertNotNull(result);
        assertEquals(2L, result.getBody().getUserId());

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