package com.maghrebia.User.mfa;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mfa")
public class MfaController {
    private final MfaService mfaService;

    public MfaController(MfaService mfaService) {
        this.mfaService = mfaService;
    }

    @GetMapping("/setup/{username}")
    public String setupMfa(@PathVariable String username) {
        String secretKey = mfaService.generateSecretKey();
        return mfaService.getQrCodeUrl(username,secretKey);
    }
}
