package com.maghrebia.Consulting.consult;


public class ConsultationPredictionRequest {
    private String type_service;
    private double duree_historique;
    private double expertise_consultant;

    // Getters & Setters
    public String getType_service() {
        return type_service;
    }

    public void setType_service(String type_service) {
        this.type_service = type_service;
    }

    public double getDuree_historique() {
        return duree_historique;
    }

    public void setDuree_historique(double duree_historique) {
        this.duree_historique = duree_historique;
    }

    public double getExpertise_consultant() {
        return expertise_consultant;
    }

    public void setExpertise_consultant(double expertise_consultant) {
        this.expertise_consultant = expertise_consultant;
    }
}
