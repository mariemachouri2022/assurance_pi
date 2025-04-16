package com.maghrebia.Consulting;

import com.maghrebia.Consulting.Feign.ConsultingService;
import com.maghrebia.Consulting.Feign.ProduitClient;
import com.maghrebia.Consulting.Feign.ProduitDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consulting")
public class ConsultingController {

    @Autowired
    private ConsultingService service;

    @Autowired
    private ProduitClient produitClient;

    @GetMapping("/salaire-moyen")
    public double getSalaireMoyen() {
        return service.getMoyenneSalaire();
    }
    @GetMapping("/produits")
    public List<ProduitDTO> getProduitsRecommandes() {
        return produitClient.getAllProduits(); // plus tard tu pourras filtrer
    }
}
