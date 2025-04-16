package com.maghrebia.Consulting.Satisfaction;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTestEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Test SMTP");
        message.setText("Ceci est un test d'envoi d'email avec Spring Boot !");
        message.setFrom("achoury.mayem@gmail.com");

        mailSender.send(message);
        System.out.println("✅ Email envoyé à " + to);
    }
    public void sendRatingEmail(String to, double rating) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Votre note de satisfaction - Assurance Maghrebiya");
        message.setText("Bonjour,\n\nNous vous remercions pour votre confiance.\n" +
                "Votre note de satisfaction est : " + rating + " / 10.\n" +
                "Nous restons à votre service.\n\nL’équipe Maghrebiya.");

        mailSender.send(message);
    }
    public void sendRatingConfirmation(String to, int score) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Confirmation de votre évaluation");
        message.setText("Merci pour votre avis ! Vous avez donné une note de " + score + "/5.");
        mailSender.send(message);
    }
    // Supposons que tu récupères les emails depuis une base ou une liste statique pour le moment
    public void sendSatisfactionEmailToClients() {
        List<String> clientEmails = List.of(
                "client1@example.com",
                "client2@example.com"
        );

        String subject = "Satisfaction du client";
        String message = "Merci pour votre confiance chez Maghrebia.\n"
                + "Êtes-vous satisfait de nos services ?\n"
                + "Remplissez ce formulaire : https://docs.google.com/forms/d/e/1FAIpQLSeCNxBcjjA8YB-MyJ5XEd3sqSHTOGjCJ6bep6EDRYX03kL-lg/viewform?usp=header";

        for (String to : clientEmails) {
            sendEmail(to, subject, message);
        }
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@maghrebia.tn"); // à configurer dans application.properties
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

}

