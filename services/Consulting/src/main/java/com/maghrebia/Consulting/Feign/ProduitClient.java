package com.maghrebia.Consulting.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "product-service", url = "http://localhost:8026")
public interface ProduitClient {
    @GetMapping("/produits")
    List<ProduitDTO> getAllProduits();
}
