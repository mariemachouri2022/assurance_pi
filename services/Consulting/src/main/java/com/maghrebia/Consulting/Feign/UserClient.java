package com.maghrebia.Consulting.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "User-Service", url = "http://localhost:8023") // Utilisation de la configuration FeignConfig
public interface UserClient {

    @GetMapping("/api/auth")
    List<UserDTO> getAllUsers();
}

