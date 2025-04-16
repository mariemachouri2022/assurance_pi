package com.maghrebia.Consulting.Satisfaction;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SatisfactionRequest {

    private double salaire;
    @JsonProperty("has_credit")
    private int hasCredit;
    private int hasInsurance;
    private int age;
    private int anciennete;

    // Getters et Setters
    public double getSalaire() {
        return salaire;
    }

    public void setSalaire(double salaire) {
        this.salaire = salaire;
    }

    public int getHasCredit() {
        return hasCredit;
    }

    public void setHasCredit(int hasCredit) {
        this.hasCredit = hasCredit;
    }

    public int getHasInsurance() {
        return hasInsurance;
    }

    public void setHasInsurance(int hasInsurance) {
        this.hasInsurance = hasInsurance;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAnciennete() {
        return anciennete;
    }

    public void setAnciennete(int anciennete) {
        this.anciennete = anciennete;
    }
}