package com.maghrebia.User.profiling.userP;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile createProfile(UserProfile profile) {
        return userProfileRepository.save(profile);
    }

    public Optional<UserProfile> getProfileById(String id) {
        return userProfileRepository.findById(id);
    }

    // Ajoutez d'autres méthodes selon vos besoins
}
