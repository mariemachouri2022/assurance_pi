package com.maghrebia.Consulting.Satisfaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailScheduler {

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 180000) // 3 minutes
    public void sendSatisfactionEmail() {
        emailService.sendSatisfactionEmailToClients();
    }
}
