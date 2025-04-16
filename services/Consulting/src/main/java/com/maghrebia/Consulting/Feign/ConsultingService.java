package com.maghrebia.Consulting.Feign;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultingService {

    @Autowired
    private UserClient userClient;

    public double getMoyenneSalaire() {
        List<UserDTO> users = userClient.getAllUsers();
        return users.stream()
                .mapToDouble(UserDTO::getSalaire)
                .average()
                .orElse(0.0);
    }
}
