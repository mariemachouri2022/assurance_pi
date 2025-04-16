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
<<<<<<< HEAD
    private String eligibilityCriteriaJson; // Critères sous forme de JSON

    // Constructeurs, Getters, Setters
}
=======
    private List<String> eligibilityCriteria; // Ex: ["hasCar", "age>25"]

    // Constructeurs, Getters, Setters
}

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
