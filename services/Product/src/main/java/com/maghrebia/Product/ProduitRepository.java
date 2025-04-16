package com.maghrebia.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProduitRepository extends MongoRepository<Produit, String> {
    List<Produit> findByType(String type);
    @Query("{'$or': [ " +
            "{'Type': {$regex: ?0, $options: 'i'}}, " +
            "{'Description': {$regex: ?0, $options: 'i'}}, " +
            "{'Tarifs': {$regex: ?0, $options: 'i'}}, " +
            "{'Image': {$regex: ?0, $options: 'i'}}" +
            "]}")
    List<Produit> searchProduits(String keyword);

    List<Produit> findByClientId(String clientId);
}
