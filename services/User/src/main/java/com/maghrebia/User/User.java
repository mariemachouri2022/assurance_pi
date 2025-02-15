package com.maghrebia.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cin;
    private String nom;
    private String prenom;
    private String adresse;
    private String role;
    private String email;
}
