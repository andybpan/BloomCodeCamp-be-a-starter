package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepo;

    public List<Assignment> getAssignmentsByUser(Long userId){
        Optional<List<Assignment>> assignmentOpt = assignmentRepo.findByUserId(userId);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
    }

    public Assignment getAssignmentById(Long id){
        Optional<Assignment> assignmentOpt = assignmentRepo.findByID(id);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
    }

    public Assignment updateAssignmentById(Long id, Assignment assignment){
        Optional<Assignment> assignmentOpt = assignmentRepo.updateAssignment(id, assignment);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
    }

    public Assignment createAssignment(Assignment assignment){
        Optional<Assignment> assignmentOpt = assignmentRepo.createAssignment(assignment);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
    }

}