package com.hcc.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.hcc.dto.AuthCredentialsRequest;
import com.hcc.entities.User;
import com.hcc.utils.JwtUtil;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@SpringBootTest
public class AuthenticationServiceTest {

    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserDetailServiceImpl userDetailServiceImpl;

    // Login Tests
    @Test
    public void login_validRequest_returnsToken() {
        // GIVEN
        AuthCredentialsRequest request = new AuthCredentialsRequest("username", "password");

        Authentication authentication = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtil.generateToken(userDetails)).thenReturn("mockedToken");

        // WHEN
        String token = authenticationService.login(request);

        // THEN
        assertEquals("mockedToken", token);
    }

    @Test
    public void login_invalidUserName_returnsToken() {
        // GIVEN
        AuthCredentialsRequest request = new AuthCredentialsRequest("invalidUsername", "password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new UsernameNotFoundException("Username Not found"));
        // THEN
        assertThrows(UsernameNotFoundException.class, ()->{
            authenticationService.login(request);
        });
    }

    @Test
    public void login_invalidPassword_returnsToken() {
        // GIVEN
        AuthCredentialsRequest request = new AuthCredentialsRequest("username", "invalid_password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new UsernameNotFoundException("Invalid Credentials"));
        // THEN
        assertThrows(UsernameNotFoundException.class, ()->{
            authenticationService.login(request);
        });
    }

    // validateToken Tests
    @Test
    public void validateToken_validToken_returnsTrue() {
        // GIVEN
        String token = "some token asjkdfalskdflasfjkbsf";
        String expectedUserName = "expected_username";
        User expectedUser = new User();

        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(expectedUserName);
        when(userDetailServiceImpl.loadUserByUsername(expectedUserName)).thenReturn(expectedUser);
        when(jwtUtil.validateToken(token, expectedUser)).thenReturn(true);
        // WHEN
        boolean isValid = authenticationService.validateToken(token);

        // THEN
        assertTrue(isValid);
    }

    @Test
    public void validateToken_validToken_returnsTrue_UserDetails() {
        String token = "some token asjkdfalskdflasfjkbsf";
        String username = "some.username";
        UserDetails userDetails = mock(UserDetails.class);

        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(username);
        when(userDetailServiceImpl.loadUserByUsername(username)).thenReturn(userDetails);
        when(jwtUtil.validateToken(token, userDetails)).thenReturn(true);

        boolean isValid = authenticationService.validateToken(token);

        assertTrue(isValid);
    }

    @Test
    public void validateToken_invalidToken_returnsFalse() {
        // GIVEN
        String token = "some token asjkdfalskdflasfjkbsf";
        String randomUsername = "random_username";
        User randomUser = new User();

        // if somehow the token retrieve a random username
        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(randomUsername);
        when(userDetailServiceImpl.loadUserByUsername(randomUsername)).thenReturn(randomUser);
        when(jwtUtil.validateToken(token, randomUser)).thenReturn(false);

        // WHEN
        boolean isValid = authenticationService.validateToken(token);

        // THEN
        assertFalse(isValid);
    }

    @Test
    public void validateToken_UsernameNotFound_throwsUsernameNotFoundException() {
        // GIVEN
        String token = "some token asjkdfalskdflasfjkbsf";
        String expectedUserName = "expected_username";

        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(expectedUserName);
        when(userDetailServiceImpl.loadUserByUsername(expectedUserName))
                .thenThrow(new UsernameNotFoundException("Invalid Credentials"));
        // WHEN
        // THEN
        assertThrows(UsernameNotFoundException.class, ()->{
            authenticationService.validateToken(token);
        });
    }
}
