package com.maghrebia.Consulting.Satisfaction;

import com.maghrebia.Consulting.Scoring.Rating;
import com.maghrebia.Consulting.Scoring.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private RatingRepository ratingRepository;

    @GetMapping("/test")
    public String sendTestEmail(@RequestParam String to) {
        emailService.sendTestEmail(to);
        return "Email envoyé à " + to;
    }
    @PostMapping
    public ResponseEntity<Rating> addRating(@RequestBody Rating rating, @RequestParam String userEmail) {
        Rating savedRating = ratingRepository.save(rating);
        emailService.sendRatingConfirmation(userEmail, savedRating.getScore());
        return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
    }
}
