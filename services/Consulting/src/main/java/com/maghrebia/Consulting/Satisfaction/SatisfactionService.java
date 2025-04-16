package com.maghrebia.Consulting.Satisfaction;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Service
public class SatisfactionService {
    private RestTemplate restTemplate;

    public SatisfactionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public double getSatisfactionPrediction(UserRequest request) {
        String url = "http://localhost:5001/predict";  // URL du service de prédiction

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestData = new HashMap<>();
        requestData.put("salaire", request.getSalaire());
        requestData.put("has_credit", request.isHasCredit());
        requestData.put("has_insurance", request.isHasInsurance());
        requestData.put("age", request.getAge());
        requestData.put("anciennete", request.getAnciennete());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestData, headers);

        // Maintenant, on attend une réponse de type PredictionResponse
        ResponseEntity<PredictionResponse> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, PredictionResponse.class
        );

        // Retourner la prédiction (valeur extraite du JSON)
        return response.getBody().getPrediction();
    }
    public String convertRequestToJson(SatisfactionRequest request) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(request); // Convertit l'objet en JSON
        } catch (Exception e) {
            e.printStackTrace();
            return "{}"; // Retourne un JSON vide en cas d'erreur
        }
    }
}