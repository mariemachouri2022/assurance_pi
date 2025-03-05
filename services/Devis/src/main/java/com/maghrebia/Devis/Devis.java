package com.maghrebia.Devis;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "devis")
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Devis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private double montantEstime;
    private Date dateDemande;
    private String typeAssurance;

    @Enumerated(EnumType.STRING) // Store enum as a string in the database
    private EtatDevis etatDevis; // Use the enum type here

    // Informations sur le parent/tuteur
    private String parentTuteurNom; // Nom du parent/tuteur
    private String parentTuteurPieceIdentite; // Type de pièce d'identité
    private String parentTuteurNumPieceIdentite; // Numéro de pièce d'identité
    private String parentTuteurTelephone; // Numéro de téléphone
    private String parentTuteurEmail; // Email
    private int nombreEnfants; // Nombre d'enfants à assurer
    private Date dateEffet; // Date d'effet du contrat
    private String formule; // Formule d'assurance choisie
    private String garanties; // Garanties sélectionnées
    private String secteurActivite; // Secteur d'activité du parent/tuteur
    private String profession; // Profession du parent/tuteur

    // Informations sur les enfants
    private String enfantNom; // Nom de l'enfant
    private String enfantPrenom; // Prénom de l'enfant
    private Date enfantDateNaissance; // Date de naissance de l'enfant

    // Informations sur le voyage (si applicable)
    private int dureeContrat; // Durée du contrat (en jours ou mois)
    private Date dateDepart; // Date de départ
    private Date dateRetour; // Date de retour
    private String Destination; // Destination
    private String TrancheAge; // Tranche d'age du voyageur
    private String zoneGeographique; // Zone géographique couverte

    // Informations sur l'assurance habitation (si applicable)
    private String packChoisi; // Pack d'assurance habitation choisi
    private double primeTotale; // Prime totale de l'assurance
    private String garantiesHabitation; // Garanties couvertes par l'assurance habitation

    // Informations sur l'assurance santé (si applicable)
    private String contactNom; // Nom du contact pour l'assurance santé
    private String contactPrenom; // Prénom du contact
    private String contactEmail; // Email du contact
    private String contactSociete; // Société du contact
    private String contactFonction; // Fonction du contact
    private String contactTelephone; // Téléphone du contact
    private Date contactDateNaissance; // Date de naissance du contact

    // Autres attributs selon besoin
    private String message; // Message additionnel
}
