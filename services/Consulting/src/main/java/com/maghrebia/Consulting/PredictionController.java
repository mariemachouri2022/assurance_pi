package com.maghrebia.Consulting;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    private final PythonModelService predictionService;

    public PredictionController(PythonModelService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/engagement")
    public Mono<PredictionResult> predictEngagement(@RequestBody UserData userData) {
        return predictionService.predictEngagement(userData);
    }
}