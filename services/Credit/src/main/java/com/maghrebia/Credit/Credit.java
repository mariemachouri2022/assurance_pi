package com.maghrebia.Credit;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "credit")
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Credit {

    @Id
    private String id;  // MongoDB uses String IDs by default
    private float montant;
    private float tauxInteret;
    private int duree;
    private TypeCredit typeCredit;
    private EtatCredit etatCredit;
    private String historiquePaiements;
}
