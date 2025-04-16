package com.maghrebia.Consulting.Satisfaction;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class SatisfactionController {

    private final SatisfactionService satisfactionService;

    @Autowired
    public SatisfactionController(SatisfactionService satisfactionService) {
        this.satisfactionService = satisfactionService;
    }

    @PostMapping
    public ResponseEntity<?> predictSatisfaction(@RequestBody UserRequest request) {
        try {
            // Appelez le service qui enverra la requête au modèle
            double prediction = satisfactionService.getSatisfactionPrediction(request);
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}