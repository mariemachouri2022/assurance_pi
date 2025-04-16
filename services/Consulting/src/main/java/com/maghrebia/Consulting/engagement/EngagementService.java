package com.maghrebia.Consulting.engagement;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EngagementService {

    public EngagementResponse predict(EngagementRequest engagementRequest) {
        String url = "http://localhost:5001/predict_engagement";
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Envoi de la requête et réception de la réponse sous forme de EngagementResponse
            return restTemplate.postForObject(url, engagementRequest, EngagementResponse.class);
        } catch (Exception e) {
            System.out.println("Erreur lors de l'appel à l'API Flask: " + e.getMessage());
            throw new RuntimeException("Erreur lors de l'appel à l'API Flask", e);
        }
    }
}