package com.maghrebia.User.profiling.recommendation;

import com.maghrebia.User.profiling.userP.UserProfile;
import com.maghrebia.User.profiling.userP.UserProfileRepository;
<<<<<<< HEAD
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private InsuranceProductRepository insuranceProductRepository;
<<<<<<< HEAD

    @Autowired
    private ObjectMapper objectMapper;

    public List<InsuranceProduct> recommendProducts(String userId) {
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
=======
/*
    public List<InsuranceProduct> recommendProducts(String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId);
        if (profile == null) return Collections.emptyList();
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)

        return insuranceProductRepository.findAll().stream()
                .filter(product -> isEligible(profile, product))
                .collect(Collectors.toList());
<<<<<<< HEAD
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
=======
    }*/
/*
    private boolean isEligible(UserProfile profile, InsuranceProduct product) {
        for (String criteria : product.getEligibilityCriteria()) {
            if (criteria.equals("hasCar") && !profile.isHasCar()) return false;
            if (criteria.startsWith("age>") && profile.getAge() <= Integer.parseInt(criteria.substring(4))) return false;
        }
        return true;
    }*/
}

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
