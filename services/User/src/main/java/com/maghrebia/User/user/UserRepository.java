package com.maghrebia.User.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

<<<<<<< HEAD
public interface UserRepository extends MongoRepository<User, Integer> {
=======
public interface UserRepository extends MongoRepository<User, String> {
>>>>>>> 2360348 (ajout des modeles de recommendation + formulaire de satisfaction + openfeign dans le module consulting)
    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String token);
    User findByUsername(String username);
    boolean existsByUsername(String username); // Ajoutez cette méthode
    boolean existsByEmail(String email); // Ajoutez cette méthode

}
