package com.hcc.services;

import com.hcc.entities.Assignment;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

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

    public Assignment getAssignmentById(Long id){
        Optional<Assignment> assignmentOpt = assignmentRepo.findByID(id);
        return assignmentOpt.orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id " + id));
    }

    public Assignment updateAssignmentById(Long id, Assignment updatedAssignment){
        Assignment retrievedAssignment = getAssignmentById(id);

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

        return assignmentRepo.save(retrievedAssignment);
    }

    public Assignment createAssignment(Assignment assignment) {
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        return assignmentRepo.save(assignment);
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