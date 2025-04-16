package com.maghrebia.Consulting.Feign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProduitDTO {
    private String id;
    private String type;
    private String description;
    private Double tarifs;
    private String imageBase64;
}
