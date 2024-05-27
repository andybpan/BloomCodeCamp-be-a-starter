package com.hcc.utils;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CustomPasswordEncoderTest {

    public static List<String> passwords = List.of("password", "12345", "password1234", "apple", "expectedPassword");
    public static List<String> encodedPasswords = List.of(
            "$2a$10$dHiqCQtnWxELP4ZyUk80w.m8kq5bq9.AGZ3QeSfKpW5sGp5A1u3Ea",
            "$2a$10$qF4Y8QkA1FzTZ92qxabKROJ4iKn1.IZ3QV.vjrZMp4hCBCA54aTB2",
            "$2a$10$dLdck.jpgWwgjvEQ38wB7.vCOAjFU5xBJdkeRH2w57UMOD.QHhgxe",
            "$2a$10$p562CyCYviH2Q1kELH5dJ.3Bwkl.pXrH9vcl0osd0UZe4xeK1k6se",
            "$2a$10$ZzzJWnwoMwAp1I33eP1UKO13CL/WrLrKKlkRFFNG4lT7l7hIYmTZm");

    private final CustomPasswordEncoder passwordEncoder = new CustomPasswordEncoder();

    @Test
    public void encodePassword() {
        String rawPassword = "password"; // $2a$10$2XdbWN3/GQgNCIsQzfK5Yeo0PNpd9tFwOcpio67tI4HCuZhCZQqxe
        String encodedPassword = passwordEncoder.getPasswordEncoder().encode(rawPassword);

        System.out.println("Encoded password: " + encodedPassword);
    }

    @Test
    public void encodePasswords() {
        List<String> encodedCodes = new ArrayList<>();

        encodedPasswords = passwords.stream()
                .map(password -> passwordEncoder.getPasswordEncoder().encode(password))
                .toList();

        encodedPasswords.forEach(System.out::println);
    }
}
