package com.hcc.utils;

import io.jsonwebtoken.MalformedJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    private UserDetails userDetails;


    @Test
    void validateToken_ValidToken_ShouldReturnTrue() {
        // GIVEN
        String username = "johndoe";
        userDetails = new User(username, "password123", Arrays.asList(new SimpleGrantedAuthority("ROLE_LEARNER")));
        String token = jwtUtil.generateToken(userDetails);

        // WHEN
        boolean isValid = jwtUtil.validateToken(token, userDetails);

        // THEN
        assertTrue(isValid);
    }

    @Test
    void validateToken_NotMatchingTokenAndUser_ShouldReturnFalse() {
        // GIVEN
        String username = "johndoe";
        userDetails = new User(username, "password123", Arrays.asList(new SimpleGrantedAuthority("ROLE_LEARNER")));
        String token = jwtUtil.generateToken(userDetails);

        UserDetails someUser = new User("username", "password123", Arrays.asList(new SimpleGrantedAuthority("ROLE_LEARNER")));

        // WHEN
        boolean isValid = jwtUtil.validateToken(token, someUser);

        // THEN
        assertFalse(isValid);
    }

    @Test
    void validateToken_invalidToken_throwsException() {
        // GIVEN
        String username = "johndoe";
        userDetails = new User(username, "password123", Arrays.asList(new SimpleGrantedAuthority("ROLE_LEARNER")));

        String token = "Bearer invalidTokenString.NotValidAt.All";

        // WHEN
        // THEN
        assertThrows(MalformedJwtException.class, ()->{
            jwtUtil.validateToken(token, userDetails);
        });
    }

}