package com.maghrebia.Consulting;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "client")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    private String id;

    private String nom;
    private int age;
    private String localisation;
    private String email;
}

