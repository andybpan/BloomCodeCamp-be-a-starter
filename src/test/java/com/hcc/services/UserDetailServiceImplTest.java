package com.hcc.services;

import com.hcc.entities.User;
import com.hcc.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserDetailServiceImplTest {

    @Autowired
    UserDetailServiceImpl userDetailServiceImpl;

    @MockBean
    UserRepository userRepo;

    @Test
    public void loadUserByUsername_validUsername_returnsUser() {
        //GIVEN
        String username = "username";
        User expected_user = new User();
        expected_user.setId(1L);
        expected_user.setUsername(username);
        expected_user.setPassword("password");


        when(userRepo.findByUsername(username)).thenReturn(Optional.of(expected_user));

        // WHEN
        UserDetails result = userDetailServiceImpl.loadUserByUsername(username);

        // THEN

        assertEquals(username, result.getUsername());
        assertEquals(expected_user.getPassword(), result.getPassword());

    }
    @Test
    public void loadUserByUsername_invalidUsername_throwsException() {
        //GIVEN
        String username = "username";

        when(userRepo.findByUsername(username)).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(UsernameNotFoundException.class, ()->{
            userDetailServiceImpl.loadUserByUsername(username);
        });
    }
}