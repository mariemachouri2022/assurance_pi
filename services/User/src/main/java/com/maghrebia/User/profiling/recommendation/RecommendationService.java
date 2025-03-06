package com.maghrebia.User.profiling.recommendation;

import com.maghrebia.User.profiling.userP.UserProfile;
import com.maghrebia.User.profiling.userP.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private InsuranceProductRepository insuranceProductRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<InsuranceProduct> recommendProducts(String userId) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return insuranceProductRepository.findAll().stream()
                .filter(product -> isEligible(profile, product))
                .collect(Collectors.toList());
    }

    private boolean isEligible(UserProfile profile, InsuranceProduct product) {
        try {
            JsonNode criteria = objectMapper.readTree(product.getEligibilityCriteriaJson());
            for (JsonNode criterion : criteria) {
                String criteriaName = criterion.get("criteria").asText();
                String value = criterion.get("value").asText();
                if ("hasCar".equals(criteriaName) && !profile.isHasCar()) return false;
                if ("age>25".equals(criteriaName) && profile.getDateOfBirth().until(LocalDate.now()).getYears() <= Integer.parseInt(value)) return false;
                if ("income>".equals(criteriaName) && profile.getMonthlyIncome() <= Double.parseDouble(value)) return false;
                if ("creditScore>".equals(criteriaName) && profile.getCreditScore() <= Double.parseDouble(value)) return false;
                // Vous pouvez ajouter d'autres critères ici
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }
}
