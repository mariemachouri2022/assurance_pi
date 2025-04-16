package com.maghrebia.Consulting.consult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consultation")
public class ConsultationPredictionController {

    @Autowired
    private ConsultationPredictionService predictionService;

    @PostMapping("/predict")
    public ConsultationPredictionResponse predict(@RequestBody ConsultationPredictionRequest request) {
        return predictionService.getPrediction(request);
    }
}
