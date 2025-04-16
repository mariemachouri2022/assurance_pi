package com.maghrebia.Consulting.Scoring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {

    // Rechercher les évaluations par produit
    List<Rating> findByProductId(Long productId);
}
