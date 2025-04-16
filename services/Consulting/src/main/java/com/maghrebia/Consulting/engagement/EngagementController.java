package com.maghrebia.Consulting.engagement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class EngagementController {

    @Autowired
    private EngagementService engagementService;

    @PostMapping("/predict_engagement")
    public EngagementResponse predictEngagement(@RequestBody EngagementRequest engagementRequest) {
        try {
            // Vérification des données reçues
            if (engagementRequest.getFrequenceUtilisation() == null || engagementRequest.getTypeService() == null || engagementRequest.getAge() == null || engagementRequest.getSatisfaction() == null) {
                throw new IllegalArgumentException("Données manquantes dans la requête");
            }

            // Get the response from the service
            EngagementResponse response = engagementService.predict(engagementRequest);

            // Return the response
            return response;

        } catch (Exception e) {
            // Log the error and return a detailed message
            System.out.println("Erreur lors de la prédiction: " + e.getMessage());
            throw new RuntimeException("Erreur interne du serveur", e);
        }
    }
}