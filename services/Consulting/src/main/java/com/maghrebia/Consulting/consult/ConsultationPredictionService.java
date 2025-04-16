package com.maghrebia.Consulting.consult;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsultationPredictionService {

    @Value("${flask.api.url}")
    private String flaskApiUrl;

    public ConsultationPredictionResponse getPrediction(ConsultationPredictionRequest request) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ConsultationPredictionRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<ConsultationPredictionResponse> response = restTemplate.exchange(
                flaskApiUrl + "/predict",
                HttpMethod.POST,
                entity,
                ConsultationPredictionResponse.class
        );

        return response.getBody();
    }
}
