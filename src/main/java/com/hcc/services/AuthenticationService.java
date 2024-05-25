package com.hcc.services;

import com.hcc.dto.AuthCredentialsRequest;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.repositories.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    AuthenticationRepository authRepo;

    @Autowired
    UserDetailServiceImpl userService;

    // Method outlines set up - need to update logic
    public UserDetails login(AuthCredentialsRequest request){
        UserDetails user = userService.loadUserByUsername(request.getUsername());
        return user;
    }

    public User validateToken(String token){
        return null;
    }

}