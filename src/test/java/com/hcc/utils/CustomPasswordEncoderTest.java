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

    public static List<String> passwords2 = List.of("password123", "password456", "password789", "password1");
    public static List<String> encodedPasswords2 = List.of(
            "$2a$10$cVJCoJIxZEXORCOpGItA..HOP8de.w/JjUoQPB8OoYus2H9Zr4CpS",
            "$2a$10$gd6aO8DSLrp6hH2TTK0ejeaLA9h/x8r2kUORPPU5HKsaR6VZ7azdG",
            "$2a$10$6dq3Oh3Uxsm.8YoJSW5bRuh9mI/43bpFcOz5XXZJ5ixUORazbyeKi",
            "$2a$10$QJIGceUgRQiDwXXIQnBf/esfR6ED6lxOY4Hawgn4MKA6Jk7vajex.");

    private final CustomPasswordEncoder passwordEncoder = new CustomPasswordEncoder();

    @Test
    public void encodePassword() {
        String rawPassword = "password"; // $2a$10$2XdbWN3/GQgNCIsQzfK5Yeo0PNpd9tFwOcpio67tI4HCuZhCZQqxe
        String encodedPassword = passwordEncoder.getPasswordEncoder().encode(rawPassword);

        System.out.println("Encoded password: " + encodedPassword);
    }

    @Test
    public void encodePasswords() {
        List<String> encoded = new ArrayList<>();

        encoded = passwords.stream()
                .map(password -> passwordEncoder.getPasswordEncoder().encode(password))
                .toList();

        encoded.forEach(System.out::println);
    }

    @Test
    public void encodePasswords2() {
        List<String> encoded = new ArrayList<>();

        encoded = passwords2.stream()
                .map(password -> passwordEncoder.getPasswordEncoder().encode(password))
                .toList();

        encoded.forEach(System.out::println);
    }
}
