package com.maghrebia.Consulting.Scoring;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class UserScoringService {

    private final String FLASK_URL = "http://localhost:5001/predict"; // ou l'IP Docker

    public double predictScore(UserScoringRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<UserScoringRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<JsonNode> response = restTemplate.postForEntity(FLASK_URL, entity, JsonNode.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody().asDouble();
        } else {
            throw new RuntimeException("Erreur Flask API : " + response.getStatusCode());
        }
    }
}
