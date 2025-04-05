package com.maghrebia.Credit;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credits")
@AllArgsConstructor


public class CreditController {
    private CreditService creditService;

    @PostMapping("/add")
    public Credit addCredit(@RequestBody Credit credit) {
        return creditService.addCredit(credit);
    }
    // ✅ Récupérer tous les crédits
    @GetMapping("/all")
    public List<Credit> getAllCredits() {
        return creditService.getAllCredits();
    }


}
