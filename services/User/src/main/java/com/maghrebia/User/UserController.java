package com.maghrebia.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllCandidats() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateCandidat(@PathVariable int id, @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
