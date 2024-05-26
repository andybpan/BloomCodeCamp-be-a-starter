package com.hcc.services;


import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AssignmentServiceTest {

    @Autowired
    private AssignmentService assignmentService;

    @MockBean
    private AssignmentRepository assignmentRepo;

    @BeforeEach
    public void setUp() {
        // Initialization if necessary
    }

    // getAssignmentByUser Tests
    @Test
    public void getAssignmentsByUser_existingUser_returnAssignments() {
        // GIVEN
        Long userId = 1L;

        Assignment assignment1 = new Assignment();
        Assignment assignment2 = new Assignment();
        Assignment assignment3 = new Assignment();

        List<Assignment> expectedAssignmentList = new ArrayList<>();
        expectedAssignmentList.add(assignment1);
        expectedAssignmentList.add(assignment2);
        expectedAssignmentList.add(assignment3);

        when(assignmentRepo.findByUser_Id(userId)).thenReturn(expectedAssignmentList);

        // WHEN
        List<Assignment> result = assignmentService.getAssignmentsByUser(userId);

        // THEN
        assertEquals(expectedAssignmentList, result);
    }

    @Test
    public void getAssignmentsByUser_existingUser_returnNoAssignments(){
        // GIVEN
        Long userId = 1L;

        List<Assignment> expectedAssignmentList = new ArrayList<>();

        when(assignmentRepo.findByUser_Id(userId)).thenReturn(expectedAssignmentList);

        // WHEN
        List<Assignment> result = assignmentService.getAssignmentsByUser(userId);

        // THEN
        assertEquals(expectedAssignmentList, result);
    }


    // getAssignmentById Tests
    // public AssignmentResponseDto getAssignmentById(Long id){}
    @Test
    public void getAssignmentById_existingId_returnAssignmentDto(){
        // GIVEN
        Assignment expectedAssignment = new Assignment();
        Long id = 1L;

        AssignmentResponseDto expectedAssignmentDto = new AssignmentResponseDto(expectedAssignment);

        when(assignmentRepo.findById(id)).thenReturn(Optional.of(expectedAssignment));

        // WHEN
        AssignmentResponseDto result = assignmentService.getAssignmentById(id);

        // THEN
        assertEquals(expectedAssignmentDto, result);
    }

    @Test
    public void getAssignmentById_nonExistingId_throwResourceNotFoundException(){
        // GIVEN
        Assignment expectedAssignment = new Assignment();
        Long id = 10L;

        AssignmentResponseDto expectedAssignmentDto = new AssignmentResponseDto(expectedAssignment);

        when(assignmentRepo.findById(id)).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(ResourceNotFoundException.class, ()->{
            assignmentService.getAssignmentById(id);;
        });
    }

    // public AssignmentResponseDto updateAssignmentById(Long id, Assignment updatedAssignment){}
    @Test
    public void updateAssignmentById_existingId_returnAssignmentDto(){

    }


    @Test
    public void updateAssignmentById_nonExistingId_throwResourceNotFoundException(){

    }

    @Test
    public void updateAssignmentById_invalidStatusChange_throwInvalidStatusChangeException(){

    }

    // public AssignmentResponseDto createAssignment(Assignment assignment) {}


}