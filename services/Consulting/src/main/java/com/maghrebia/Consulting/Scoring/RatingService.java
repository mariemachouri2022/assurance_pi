package com.maghrebia.Consulting.Scoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    // Ajouter une nouvelle évaluation
    public Rating addRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    // Obtenir les évaluations d'un produit
    public List<Rating> getRatingsByProductId(Long productId) {
        return ratingRepository.findByProductId(productId);
    }

    // Calculer la note moyenne d'un produit
    public double calculateAverageRating(Long productId) {
        List<Rating> ratings = getRatingsByProductId(productId);
        if (ratings.isEmpty()) {
            return 0;
        }
        int sum = ratings.stream().mapToInt(Rating::getScore).sum();
        return (double) sum / ratings.size();
    }
}

