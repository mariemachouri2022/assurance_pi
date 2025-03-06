package com.maghrebia.User.profiling.recommendation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "insurance_products")
public class InsuranceProduct {
    @Id
    private String id;
    private String name;
    private String category; // "Auto", "Santé", "Crédit"
    private String description;
    private double basePrice;
    private String eligibilityCriteriaJson; // Critères sous forme de JSON

    // Constructeurs, Getters, Setters
}
