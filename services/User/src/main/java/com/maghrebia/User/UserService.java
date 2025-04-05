package com.maghrebia.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User updateUser(int id, User newUser) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setNom(newUser.getNom());
            existingUser.setPrenom(newUser.getPrenom());
            existingUser.setEmail(newUser.getEmail());
            return userRepository.save(existingUser);
        }).orElse(null);
    }

    public String deleteUser(int id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
            return "User supprimé";
        } else {
            return "User non trouvé";
        }
    }
}
