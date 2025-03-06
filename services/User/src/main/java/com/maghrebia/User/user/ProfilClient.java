package com.maghrebia.User.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "profils")
public class ProfilClient {
    @Id
    private String id;

    // Informations personnelles
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private LocalDate dateNaissance;
    private String statutEmploi;
    private double revenuMensuel;
    private double chargesMensuelles;
    private int scoreCredit;

    // Assurance
    private String typeAssurance;
    private String niveauCouverture;
    private boolean proprietaire;
    private double valeurBienAssure;

    // Historique des accidents & sinistres
    private int nombreAccidents;
    private int nombreSinistres;
    private double totalIndemnisations;
    private String responsabiliteSinistres;
    private double coefficientBonusMalus;

    // Getters & Setters
}
