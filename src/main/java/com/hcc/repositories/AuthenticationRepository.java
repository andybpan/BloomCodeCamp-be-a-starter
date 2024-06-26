package com.hcc.repositories;

import com.hcc.entities.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthenticationRepository extends JpaRepository<Authority, Long> {

//    Optional<Authority> findById(Long id);

}