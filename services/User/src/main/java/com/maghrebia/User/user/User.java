package com.maghrebia.User.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
<<<<<<< HEAD
=======
import java.util.Set;

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
<<<<<<< HEAD
=======
    private Set<ERole> roles;
    // Ajout des attributs pour le scoring
    private double salaire;
    private boolean hasCredit;
    private boolean hasInsurance;
    // 🔹 Attributs pour analyse/scoring

    private int age;
    private int anciennete;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalaire() {
        return salaire;
    }

    public void setSalaire(double salaire) {
        this.salaire = salaire;
    }

    public boolean isHasCredit() {
        return hasCredit;
    }

    public void setHasCredit(boolean hasCredit) {
        this.hasCredit = hasCredit;
    }

    public boolean isHasInsurance() {
        return hasInsurance;
    }

    public void setHasInsurance(boolean hasInsurance) {
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

    public User(String username, String email, String password, Set<ERole> roles, double salaire, boolean hasCredit, boolean hasInsurance, boolean mfaEnabled, String otpSecret, String mfaSecret, String resetToken) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.salaire = salaire;
        this.hasCredit = hasCredit;
        this.hasInsurance = hasInsurance;
        this.mfaEnabled = mfaEnabled;
        this.otpSecret = otpSecret;
        this.mfaSecret = mfaSecret;
        this.resetToken = resetToken;
    }

    public User() {

    }

    public Set<ERole> getRoles() {
        return roles;
    }

    public void setRoles(Set<ERole> roles) {
        this.roles = roles;
    }
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)

    // Ajout de MFA
    private boolean mfaEnabled;
    private String otpSecret;
    private String mfaSecret;  // Store the MFA secret here

    private String resetToken;
    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMfaSecret() {
        return mfaSecret;
    }

    public void setMfaSecret(String mfaSecret) {
        this.mfaSecret = mfaSecret;
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}