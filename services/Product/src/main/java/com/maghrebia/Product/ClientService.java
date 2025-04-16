package com.maghrebia.Product;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "consulting", url = "http://localhost:8028") // adapte le port
public interface ClientService {

    @GetMapping("/api/clients/{id}")
    Client getClientById(@PathVariable("id") String id);
}