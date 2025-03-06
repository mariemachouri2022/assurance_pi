package com.maghrebia.User.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String token);
    User findByUsername(String username);
    boolean existsByUsername(String username); // Ajoutez cette méthode
    boolean existsByEmail(String email); // Ajoutez cette méthode

}
