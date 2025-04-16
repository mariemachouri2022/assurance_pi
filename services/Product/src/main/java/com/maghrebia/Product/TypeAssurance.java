package com.maghrebia.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TypeAssurance")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypeAssurance {
    @Id
    private String id ;
    @JsonProperty("type")
    private String type;
    private String url;
}
