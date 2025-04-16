package com.maghrebia.User.mfa;

<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)

@RestController
@RequestMapping("/api/mfa")
public class MfaController {
<<<<<<< HEAD
=======

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
    private final MfaService mfaService;

    public MfaController(MfaService mfaService) {
        this.mfaService = mfaService;
    }

<<<<<<< HEAD
    @GetMapping("/setup/{username}")
    public String setupMfa(@PathVariable String username) {
        String secretKey = mfaService.generateSecretKey();
        return mfaService.getQrCodeUrl(username,secretKey);
    }
=======
    @GetMapping("/setup/{username}/{email}")
    public String setupMfa(@PathVariable String username, @PathVariable String email) {
        String secretKey = mfaService.generateSecretKey(username, email);
        return mfaService.getQrCodeUrl(username, secretKey);
    }

>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
}
