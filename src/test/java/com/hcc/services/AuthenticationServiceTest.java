package com.hcc.services;

import com.hcc.dto.AuthCredentialsRequest;

import com.hcc.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceTest {

    @Autowired
    AuthenticationService authService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserDetailServiceImpl userDetailServiceImpl;

    @MockBean
    private PasswordEncoder passwordEncoder;

//    public String login(AuthCredentialsRequest request) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//        );
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        return jwtUtil.generateToken(userDetails);
//    }
//
//    public boolean validateToken(String token) {
//        String username = jwtUtil.getUsernameFromToken(token);
//        UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(username);
//        return jwtUtil.validateToken(token, userDetails);
//    }

    // Login Tests
    @Test
    public void login_validRequest_returnsToken() {

    }

    @Test
    public void login_invalidUserName_returnsToken() {

    }

    @Test
    public void login_invalidPassword_returnsToken() {

    }


    // validateToken Tests
}