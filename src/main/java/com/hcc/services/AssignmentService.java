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
        return assignmentRepo.findByUserId(userId);
    }

    public Assignment getAssignmentById(Long id){
        Optional<Assignment> assignmentOpt = assignmentRepo.findByID(id);
        return assignmentOpt.orElseThrow(() -> new RuntimeException("Assignment not found with id " + id));
    }

    public Assignment updateAssignmentById(Long id, Assignment assignment){
        Assignment retrievedAssignment = getAssignmentById(id);

        retrievedAssignment.setNumber(assignment.getNumber());
        retrievedAssignment.setGithubUrl(assignment.getGithubUrl());
        retrievedAssignment.setBranch(assignment.getBranch());

        // Sometimes this will be missing - this will override it???
        // We need to check the type of update this is in order to not accidentally overwrite info
        // does RB do full updates on empty attributes? huh....
        // where does the DTO come in.
        retrievedAssignment.setCodeReviewer(assignment.getCodeReviewer());
        retrievedAssignment.setReviewVideoUrl(assignment.getReviewVideoUrl());
        retrievedAssignment.setStatus(assignment.getStatus());

        return assignmentRepo.save(assignment);
    }

    public Assignment createAssignment(Assignment assignment){
        return assignmentRepo.save(assignment);
    }

}