package com.maghrebia.User.profiling.recommendation;

import com.maghrebia.User.profiling.recommendation.InsuranceProduct;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceProductRepository extends MongoRepository<InsuranceProduct, String> {
}

