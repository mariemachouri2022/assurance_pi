package com.maghrebia.Consulting.Scoring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // Ajouter une nouvelle évaluation
    @PostMapping
    public Rating addRating(@RequestBody Rating rating) {
        return ratingService.addRating(rating);
    }

    // Obtenir les évaluations d'un produit
    @GetMapping("/product/{productId}")
    public List<Rating> getRatingsByProductId(@PathVariable Long productId) {
        return ratingService.getRatingsByProductId(productId);
    }

    // Calculer la note moyenne d'un produit
    @GetMapping("/product/{productId}/average")
    public double getAverageRating(@PathVariable Long productId) {
        return ratingService.calculateAverageRating(productId);
    }
    @GetMapping("/rating")
    public String showRatingPage(Model model) {
        // Envoi des données nécessaires à la vue
        model.addAttribute("product", new Product("Exemple Produit"));
        return "rating";  // Le nom de ton fichier HTML dans src/main/resources/templates
    }
}
