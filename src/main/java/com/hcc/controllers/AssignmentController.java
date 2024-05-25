package com.hcc.controllers;

import com.hcc.entities.Assignment;
import com.hcc.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Assignment>> getAllAssignmentsByUser(@RequestParam Long userId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignmentById(@PathVariable Long id, @RequestBody Assignment assignment) {
        return ResponseEntity.ok(assignmentService.updateAssignmentById(id, assignment));
    }

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }
}
