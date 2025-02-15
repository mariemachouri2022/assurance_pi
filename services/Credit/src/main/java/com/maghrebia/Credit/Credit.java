package com.maghrebia.Credit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Credit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private float montant;
    private float tauxInteret;
    private int duree;
    private TypeCredit typeCredit;
  //  private Product assurance;
    private EtatCredit etatCredit;
    private String historiquePaiements;
}
