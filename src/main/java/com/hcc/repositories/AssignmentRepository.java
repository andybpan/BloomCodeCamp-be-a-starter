package com.hcc.repositories;

import com.hcc.entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Optional<List<Assignment>> findByUserId(Long userId);

    Optional<Assignment> findByID(Long id);

    Optional<Assignment> updateAssignment(Long id, Assignment Assignment);

    Optional<Assignment> createAssignment(Assignment Assignment);
}