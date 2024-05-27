package com.hcc.services;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.exceptions.InvalidStatusChangeException;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;

    public List<Assignment> getAssignmentsByUser(String token){
        String actualToken = token.substring(7);
        String username = jwtUtil.getUsernameFromToken(actualToken);
        User user = userDetailServiceImpl.findUserByUsername(username);
        return assignmentRepo.findByUser_Id(user.getId());
    }

    public AssignmentResponseDto getAssignmentById(Long id){
        Assignment retrievedAssignment = getAssignmentByIdHelper(id);
        return new AssignmentResponseDto(retrievedAssignment);
    }

    public AssignmentResponseDto updateAssignmentById(Long id, Assignment updatedAssignment){
        Assignment retrievedAssignment = getAssignmentByIdHelper(id);

        retrievedAssignment.setNumber(updatedAssignment.getNumber());
        retrievedAssignment.setGithubUrl(updatedAssignment.getGithubUrl());
        retrievedAssignment.setBranch(updatedAssignment.getBranch());
        retrievedAssignment.setCodeReviewer(updatedAssignment.getCodeReviewer());
        retrievedAssignment.setReviewVideoUrl(updatedAssignment.getReviewVideoUrl());
        retrievedAssignment.setUser(updatedAssignment.getUser());
        retrievedAssignment.setCodeReviewer(updatedAssignment.getCodeReviewer());

        // update status
        AssignmentStatusEnum currentStatus = AssignmentStatusEnum.valueOf(retrievedAssignment.getStatus());
        AssignmentStatusEnum newStatus = AssignmentStatusEnum.valueOf(updatedAssignment.getStatus());

        if (isValidStatusTransition(currentStatus, newStatus)) {
            retrievedAssignment.setStatus(newStatus.toString());
        } else {
            throw new InvalidStatusChangeException("Invalid status transition from " + currentStatus + " to " + newStatus);
        }

        assignmentRepo.save(retrievedAssignment);
        return new AssignmentResponseDto(retrievedAssignment);
    }

    public AssignmentResponseDto createAssignment(Assignment assignment) {
        Assignment newAssignment = new Assignment();
        newAssignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.toString());
        newAssignment.setUser(assignment.getUser());
        assignmentRepo.save(newAssignment);
        return new AssignmentResponseDto(newAssignment);
    }

    // Helper Methods
    private Assignment getAssignmentByIdHelper(Long id){
        Optional<Assignment> assignmentOpt = assignmentRepo.findById(id);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id " + id));
    }

    private boolean isValidStatusTransition(AssignmentStatusEnum currentStatus, AssignmentStatusEnum newStatus) {
        switch (currentStatus) {
            case PENDING_SUBMISSION:
                return newStatus == AssignmentStatusEnum.SUBMITTED;
            case SUBMITTED:
                return newStatus == AssignmentStatusEnum.IN_REVIEW;
            case IN_REVIEW:
                return newStatus == AssignmentStatusEnum.COMPLETED || newStatus == AssignmentStatusEnum.NEEDS_UPDATE;
            case NEEDS_UPDATE:
                return newStatus == AssignmentStatusEnum.RESUBMITTED;
            case RESUBMITTED:
                return newStatus == AssignmentStatusEnum.IN_REVIEW;
            default:
                return false;
        }
    }
}