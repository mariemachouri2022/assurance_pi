package com.maghrebia.User.mfa;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class MfaService {

    private final GoogleAuthenticator googleAuthenticator;

    public MfaService() {
        this.googleAuthenticator = new GoogleAuthenticator();
    }

    public String generateSecretKey() {
        String secretKey = googleAuthenticator.createCredentials().getKey();
        log.info("Generated MFA Secret Key: {}", secretKey);
        return secretKey;
    }

    public String getQrCodeUrl(String username, String secret) {
        String issuer = "Maghrebia";  // Nom de ton application
        String encodedIssuer = URLEncoder.encode(issuer, StandardCharsets.UTF_8);
        String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);

        return String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s",
                encodedIssuer, encodedUsername, secret, encodedIssuer);
    }

    public boolean verifyCode(String secret, int code) {
        boolean isValid = googleAuthenticator.authorize(secret, code);
        log.info("MFA Code verification for secret {}: {}", secret, isValid ? "SUCCESS" : "FAILED");
        return isValid;
    }
}
