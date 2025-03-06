package com.maghrebia.User.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendTestEmail() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("test@example.com");
        message.setSubject("Test Email");
        message.setText("Ceci est un test d'envoi d'email depuis Spring Boot.");

        mailSender.send(message);
        System.out.println("📨 Email envoyé avec succès !");
    }
}
