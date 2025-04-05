package com.maghrebia.Credit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CreditService {
    @Autowired
    private CreditRepositroy creditRepository;

    public Credit addCredit(Credit credit) {
        return creditRepository.save(credit);
    }

    // ✅ Récupérer tous les crédits
    public List<Credit> getAllCredits() {
        return creditRepository.findAll();
    }


}

