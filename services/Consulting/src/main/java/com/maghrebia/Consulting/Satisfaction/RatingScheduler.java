package com.maghrebia.Consulting.Satisfaction;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RatingScheduler {

    @Autowired
    private EmailService emailService;

    private Random random = new Random();

    // Chaque 2 minutes (120000 millisecondes)
    @Scheduled(fixedRate = 120000)
    public void sendPeriodicRating() {
        String email = "client@example.com"; // Tu peux faire une boucle ici sur tous les utilisateurs
        double rating = 5 + random.nextDouble() * 5; // Génère une note entre 5 et 10
        rating = Math.round(rating * 10.0) / 10.0; // arrondir à 1 chiffre après la virgule
        emailService.sendRatingEmail(email, rating);
        System.out.println("Email envoyé à " + email + " avec rating : " + rating);
    }
}
