package com.maghrebia.Consulting;

import com.maghrebia.Consulting.PredictionResult;
import com.maghrebia.Consulting.UserData;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PythonModelService {

    private final WebClient webClient;

    public PythonModelService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<PredictionResult> predictEngagement(UserData userData) {
        return webClient.post()
                .uri("http://localhost:5001/predict_engagement")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(userData)
                .retrieve()
                .bodyToMono(PredictionResult.class);
    }
}