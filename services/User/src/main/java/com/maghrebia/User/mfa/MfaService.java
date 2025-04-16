package com.maghrebia.User.mfa;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import lombok.extern.slf4j.Slf4j;
<<<<<<< HEAD
import org.springframework.stereotype.Service;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.maghrebia.User.user.EmailService;
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class MfaService {

    private final GoogleAuthenticator googleAuthenticator;

<<<<<<< HEAD
    public MfaService() {
        this.googleAuthenticator = new GoogleAuthenticator();
    }

    public String generateSecretKey() {
        String secretKey = googleAuthenticator.createCredentials().getKey();
        log.info("Generated MFA Secret Key: {}", secretKey);
=======
    @Autowired
    private JavaMailSender mailSender;
    private final EmailService emailService;

    public MfaService(EmailService emailService) {
        this.emailService = emailService;
        this.googleAuthenticator = new GoogleAuthenticator();
    }

    public String generateSecretKey(String username, String email) {
        String secretKey = googleAuthenticator.createCredentials().getKey();
        log.info("Generated MFA Secret Key for {}: {}", username, secretKey);

        // Envoyer la clé MFA par email
        String message = "Votre clé secrète MFA : " + secretKey + "\nAjoutez cette clé dans Google Authenticator.";
        emailService.sendEmail(email, "Votre clé MFA", message);

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
        return secretKey;
    }

    public String getQrCodeUrl(String username, String secret) {
<<<<<<< HEAD
        String issuer = "Maghrebia";  // Nom de ton application
=======
        String issuer = "Maghrebia";  // Nom de l'application
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
        String encodedIssuer = URLEncoder.encode(issuer, StandardCharsets.UTF_8);
        String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);

        return String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s",
                encodedIssuer, encodedUsername, secret, encodedIssuer);
    }

    public boolean verifyCode(String secret, int code) {
        boolean isValid = googleAuthenticator.authorize(secret, code);
<<<<<<< HEAD
        log.info("MFA Code verification for secret {}: {}", secret, isValid ? "SUCCESS" : "FAILED");
=======
        log.info("MFA Code verification for {}: {}", secret, isValid ? "SUCCESS" : "FAILED");
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
        return isValid;
    }
}
