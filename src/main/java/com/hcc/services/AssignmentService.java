package com.hcc.services;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.expression.spel.ast.Assign;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepo;

    public List<Assignment> getAssignmentsByUser(Long userId){
        return assignmentRepo.findByUser_Id(userId);
    }

    private Assignment getAssignmentByIdHelper(Long id){
        Optional<Assignment> assignmentOpt = assignmentRepo.findByID(id);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id " + id));
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
        retrievedAssignment.setStatus(updatedAssignment.getStatus());

        // update status
        AssignmentStatusEnum currentStatus = AssignmentStatusEnum.valueOf(retrievedAssignment.getStatus().toUpperCase());
        AssignmentStatusEnum newStatus = AssignmentStatusEnum.valueOf(updatedAssignment.getStatus().toUpperCase());

        if (isValidStatusTransition(currentStatus, newStatus)) {
            retrievedAssignment.setStatus(newStatus.getStatus());
        } else {
            throw new RuntimeException("Invalid status transition from " + currentStatus + " to " + newStatus);
        }

        Assignment savedAssignment = assignmentRepo.save(retrievedAssignment);
        return new AssignmentResponseDto(savedAssignment);
    }

    public AssignmentResponseDto createAssignment(Assignment assignment) {
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());

        return new AssignmentResponseDto(assignment);
    }

    // Helper Methods
    private boolean isValidStatusTransition(AssignmentStatusEnum currentStatus, AssignmentStatusEnum newStatus) {
        switch (currentStatus) {
            case PENDING_SUBMISSION:
                return newStatus == AssignmentStatusEnum.SUBMITTED;
            case SUBMITTED, RESUBMITTED:
                return newStatus == AssignmentStatusEnum.IN_REVIEW;
            case IN_REVIEW:
                return newStatus == AssignmentStatusEnum.COMPLETED || newStatus == AssignmentStatusEnum.NEEDS_UPDATE;
            case NEEDS_UPDATE:
                return newStatus == AssignmentStatusEnum.RESUBMITTED;
            default:
                return false;
        }
    }

}