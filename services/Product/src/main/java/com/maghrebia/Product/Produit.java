package  com.maghrebia.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "produit")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Produit {
    @Id
    private  String id ;
    @Field("Type")
    private String type;
    @JsonProperty("Description")
    private String Description;
    @JsonProperty("Tarifs")
    private Double Tarifs;
    @JsonProperty("Image")
    private String Image;
    @Lob
    @JsonProperty("ImageData")
    private byte[] imageData;
    private String imageBase64;
    private String qrCodeUrl;
    private String typeUrl;
    // Nouveaux attributs pour le ML
    @JsonProperty("NombreSinistres")
    private int nombreSinistres;

    @JsonProperty("AgeClient")
    private int ageClient;

    @JsonProperty("DureeContrat")
    private int dureeContrat;

    @JsonProperty("PrimeBase")
    private double primeBase;

    @JsonProperty("Localisation")
    private String localisation;

    @JsonProperty("clientId")
    private String clientId;



    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

}
