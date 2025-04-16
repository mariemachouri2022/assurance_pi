package com.maghrebia.Consulting.Scoring;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ratings")
public class Rating {

    @Id
    private String id; // Utilisation d'un ObjectId (String) pour MongoDB

    private Long productId; // ID du produit ou service évalué
    private int score;      // Note (de 1 à 5)
    private String comment; // Commentaire facultatif

    public Rating() {}

    public Rating(Long productId, int score, String comment) {
        this.productId = productId;
        this.score = score;
        this.comment = comment;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
