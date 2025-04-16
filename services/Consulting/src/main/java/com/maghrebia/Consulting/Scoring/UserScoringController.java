package com.maghrebia.Consulting.Scoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scoring")
public class UserScoringController {

    @Autowired
    private UserScoringService scoringService;

    @PostMapping("/predict")
    public double getScore(@RequestBody UserScoringRequest request) {
        return scoringService.predictScore(request);
    }
}
