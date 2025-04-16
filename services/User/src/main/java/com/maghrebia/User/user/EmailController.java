package com.maghrebia.User.user;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)

@RestController
@RequestMapping("/test")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/send-email")
<<<<<<< HEAD
    public String sendEmail() {
        emailService.sendTestEmail();
        return "Email envoyé !";
    }
=======
    public String sendTestEmail() {
        emailService.sendEmail("achoury.mayem@gmail.com", "Test Email", "Ceci est un email de test.");
        return "Email envoyé !";
    }

    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmaill(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
            return "Email envoyé avec succès à " + emailRequest.getTo();
        } catch (MessagingException e) {
            return "Erreur lors de l'envoi de l'email : " + e.getMessage();
        }
    }


>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
}

