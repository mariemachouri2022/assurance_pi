package com.maghrebia.Product;

import lombok.Data;

@Data
public class Client {
    private String id;
    private String nom;
    private String email;
    private int age;
    private String localisation;
}