package com.maghrebia.User.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-email")
    public String sendTestEmail(@RequestParam String email) {
        emailService.sendEmail(email, "Test Email", "This is a test email.");
        return "Test email sent to: " + email;
    }
}
