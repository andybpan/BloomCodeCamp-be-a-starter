package com.hcc.services;

import com.hcc.dto.AuthCredentialsRequest;
import com.hcc.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(AuthCredentialsRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails);
    }

    public boolean validateToken(String token) {
        String username = jwtUtil.getUsernameFromToken(token);
        UserDetails userDetails = userDetailServiceImpl.loadUserByUsername(username);
        return jwtUtil.validateToken(token, userDetails);
    }
}