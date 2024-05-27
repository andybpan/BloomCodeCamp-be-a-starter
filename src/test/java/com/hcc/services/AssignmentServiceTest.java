package com.hcc.services;


import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.exceptions.InvalidStatusChangeException;
import com.hcc.exceptions.ResourceNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.utils.JwtUtil;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AssignmentServiceTest {

    @Autowired
    private AssignmentService assignmentService;

    @MockBean
    private AssignmentRepository assignmentRepo;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserDetailServiceImpl userDetailServiceImpl;

    @BeforeEach
    public void setUp() {
        // Initialization if necessary
    }

    // getAssignmentByUser Tests

//    public List<Assignment> getAssignmentsByUser(String token){
//        String actualToken = token.substring(7);
//        String username = jwtUtil.getUsernameFromToken(actualToken);
//        User user = userDetailServiceImpl.findUserByUsername(username);
//        return assignmentRepo.findByUser_Id(user.getId());
//    }
    @Test
    public void getAssignmentsByUser_existingUser_returnAssignments() {
        // GIVEN
        String token = "Bearer token1234567890";
        String username = "username";
        Long userId = 1L;

        User user = new User();
        user.setId(userId);
        user.setUsername(username);
        Assignment assignment1 = new Assignment();
        Assignment assignment2 = new Assignment();
        Assignment assignment3 = new Assignment();

        List<Assignment> expectedAssignmentList = new ArrayList<>();
        expectedAssignmentList.add(assignment1);
        expectedAssignmentList.add(assignment2);
        expectedAssignmentList.add(assignment3);

        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(username);
        when(userDetailServiceImpl.findUserByUsername(username)).thenReturn(user);
        when(assignmentRepo.findByUser_Id(user.getId())).thenReturn(expectedAssignmentList);

        // WHEN
        List<Assignment> result = assignmentService.getAssignmentsByUser(token);

        // THEN
        assertEquals(expectedAssignmentList, result);
    }

    @Test
    public void getAssignmentsByUser_existingUser_returnNoAssignments(){
        // GIVEN
        String token = "Bearer token1234567890";
        String username = "username";
        Long userId = 1L;

        User user = new User();
        user.setId(userId);
        user.setUsername(username);

        List<Assignment> expectedAssignmentList = new ArrayList<>();

        when(jwtUtil.getUsernameFromToken(token.substring(7))).thenReturn(username);
        when(userDetailServiceImpl.findUserByUsername(username)).thenReturn(user);
        when(assignmentRepo.findByUser_Id(user.getId())).thenReturn(expectedAssignmentList);

        // WHEN
        List<Assignment> result = assignmentService.getAssignmentsByUser(token);

        // THEN
        assertEquals(expectedAssignmentList, result);
    }

    // getAssignmentById Tests
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
        assertEquals(expectedAssignmentDto.getAssignment(), result.getAssignment());
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
            assignmentService.getAssignmentById(id);
        });
    }

    // updateAssignmentById Tests
    @Test
    public void updateAssignmentById_pendingToSubmitted_returnAssignmentDto_(){
        // GIVEN
        Long id = 1L;
        User expected_Learner = new User();

        Assignment retrievedAssignment = new Assignment();
        retrievedAssignment.setId(id);
        retrievedAssignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.toString());
        retrievedAssignment.setNumber(1);

        Assignment expectedAssignment = new Assignment();
        expectedAssignment.setId(id);
        expectedAssignment.setStatus(AssignmentStatusEnum.SUBMITTED.toString());
        expectedAssignment.setNumber(1);
        expectedAssignment.setBranch("https://github.com/someUser/project");
        expectedAssignment.setBranch("branch1");
        expectedAssignment.setUser(expected_Learner);

        AssignmentResponseDto expectedAssignmentDto = new AssignmentResponseDto(expectedAssignment);

        when(assignmentRepo.findById(id)).thenReturn(Optional.of(retrievedAssignment));

        // WHEN
        AssignmentResponseDto result = assignmentService.updateAssignmentById(id, expectedAssignment);

        // THEN
        verify(assignmentRepo).save(any(Assignment.class));
        assertEquals(expectedAssignmentDto.getAssignment(), result.getAssignment());
        assertEquals((AssignmentStatusEnum.SUBMITTED.toString()), result.getAssignment().getStatus());
    }

    @Test
    public void updateAssignmentById_inReviewToComplete_returnAssignmentDto_(){
        // GIVEN
        Long id = 1L;

        Assignment retrievedAssignment = new Assignment();
        retrievedAssignment.setId(id);
        retrievedAssignment.setStatus(AssignmentStatusEnum.IN_REVIEW.toString());
        retrievedAssignment.setNumber(1);

        Assignment expectedAssignment = new Assignment();
        expectedAssignment.setId(id);
        expectedAssignment.setStatus(AssignmentStatusEnum.COMPLETED.toString());
        expectedAssignment.setNumber(1);

        AssignmentResponseDto expectedAssignmentDto = new AssignmentResponseDto(expectedAssignment);

        when(assignmentRepo.findById(id)).thenReturn(Optional.of(retrievedAssignment));

        // WHEN
        AssignmentResponseDto result = assignmentService.updateAssignmentById(id, expectedAssignment);

        // THEN
        verify(assignmentRepo).save(any(Assignment.class));
        assertEquals(expectedAssignmentDto.getAssignment(), result.getAssignment());
        assertEquals((AssignmentStatusEnum.COMPLETED.toString()), result.getAssignment().getStatus());
    }


    @Test
    public void updateAssignmentById_nonExistingId_throwResourceNotFoundException(){
        // GIVEN
        Long id = 1L;
        User expected_Learner = new User();

        Assignment expectedAssignment = new Assignment();
        expectedAssignment.setId(id);
        expectedAssignment.setStatus(AssignmentStatusEnum.SUBMITTED.toString());
        expectedAssignment.setNumber(1);
        expectedAssignment.setBranch("https://github.com/someUser/project");
        expectedAssignment.setBranch("branch1");
        expectedAssignment.setUser(expected_Learner);

        when(assignmentRepo.findById(id)).thenReturn(Optional.empty());
        // WHEN
        // THEN
        assertThrows(ResourceNotFoundException.class, ()->{
            assignmentService.updateAssignmentById(id, expectedAssignment);
        });
    }

    @Test
    public void updateAssignmentById_invalidStatusChange_throwInvalidStatusChangeException(){
        // GIVEN
        Long id = 1L;
        User expected_Learner = new User();

        Assignment retrievedAssignment = new Assignment();
        retrievedAssignment.setId(id);
        retrievedAssignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.toString());
        retrievedAssignment.setNumber(1);

        Assignment expectedAssignment = new Assignment();
        expectedAssignment.setId(id);
        expectedAssignment.setStatus(AssignmentStatusEnum.IN_REVIEW.toString());
        expectedAssignment.setNumber(1);
        expectedAssignment.setBranch("https://github.com/someUser/project");
        expectedAssignment.setBranch("branch1");
        expectedAssignment.setUser(expected_Learner);

        when(assignmentRepo.findById(id)).thenReturn(Optional.of(retrievedAssignment));

        // WHEN
        // THEN
        assertThrows(InvalidStatusChangeException.class, ()->{
            assignmentService.updateAssignmentById(id, expectedAssignment);
        });
    }

    // createAssignment Tests
    @Test
    public void createAssignment_pendingStatus_returnAssignmentDto_(){
        // GIVEN
        User expected_Learner = new User();

        Assignment expectedAssignment = new Assignment();
        expectedAssignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.toString());
        expectedAssignment.setUser(expected_Learner);

        AssignmentResponseDto expectedAssignmentDto = new AssignmentResponseDto(expectedAssignment);

        // WHEN
        AssignmentResponseDto result = assignmentService.createAssignment(expectedAssignment);

        // THEN
        verify(assignmentRepo).save(any(Assignment.class));
        assertEquals(expectedAssignmentDto.getAssignment(), result.getAssignment());
        assertEquals((AssignmentStatusEnum.PENDING_SUBMISSION.toString()), result.getAssignment().getStatus());
    }
}