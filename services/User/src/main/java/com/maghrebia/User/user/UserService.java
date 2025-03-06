package com.maghrebia.User.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;  // Pour l'envoi des emails

    // 🔹 Constructeur unique avec injection de dépendances
    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 🔹 Générer un token et envoyer un email
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = UUID.randomUUID().toString();  // Générer un token unique
        user.setResetToken(token);
        userRepository.save(user);

        // Envoyer l'email avec le lien contenant le token
        sendResetEmail(user.getEmail(), token);
    }

    // 🔹 Envoyer un email avec le lien de réinitialisation
    private void sendResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Réinitialisation de votre mot de passe");
        message.setText("Cliquez sur le lien suivant pour réinitialiser votre mot de passe : " +
                "http://localhost:4200/reset-password?token=" + token);
        mailSender.send(message);
    }

    // 🔹 Vérifier le token et mettre à jour le mot de passe
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token invalide"));

        user.setPassword(passwordEncoder.encode(newPassword));  // Hachage du mot de passe
        user.setResetToken(null);  // Supprimer le token après utilisation
        userRepository.save(user);
    }

    // 🔹 Ajouter un Bean pour le BCryptPasswordEncoder dans une classe de configuration
}
