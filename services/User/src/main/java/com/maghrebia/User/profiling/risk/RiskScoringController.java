package com.maghrebia.User.profiling.risk;

import com.maghrebia.User.profiling.userP.UserProfile;
import com.maghrebia.User.profiling.userP.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/risk")
public class RiskScoringController {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private RiskScoringService riskScoringService;
/*
    @GetMapping("/{userId}")
    public double getRiskScore(@PathVariable String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId);
        return (profile != null) ? riskScoringService.calculateRiskScore(profile) : -1;
    }*/
}

