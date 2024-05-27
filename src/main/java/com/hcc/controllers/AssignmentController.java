package com.hcc.controllers;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignmentsByUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignmentById(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignmentById(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody Assignment assignment) {
        return ResponseEntity.ok(assignmentService.updateAssignmentById(id, assignment));
    }

    @PostMapping
    public ResponseEntity<AssignmentResponseDto> createAssignment(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(assignmentService.createAssignment(user));
    }
}
