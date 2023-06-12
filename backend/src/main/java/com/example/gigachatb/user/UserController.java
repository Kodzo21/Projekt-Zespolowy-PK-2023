package com.example.gigachatb.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        var users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search/{searchTerm}")
    public ResponseEntity<List<UserResponse>> searchUsers(@PathVariable String searchTerm) {
        var users = userService.searchUsers(searchTerm);
        return ResponseEntity.ok(users);
    }


    @PostMapping("/setNewEmail/{newEmail}")
    public ResponseEntity<Map<String, String>> setNewEmail(@PathVariable String newEmail, Authentication authentication)
    {
        var user = authentication.getName();
        var userEntity = userService.getUserByEmail(user);
        userService.setNewEmial(userEntity,newEmail);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Email został zmieniony, wyloguj i zaloguj się ponownie aby zastosować zmiany");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/setNewPassword")
    public ResponseEntity<Map<String, String>> setNewPassword(@RequestBody Map<String, String> passwordData, Authentication authentication) {
        var user = authentication.getName();
        var userEntity = userService.getUserByEmail(user);

        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");

        if (!(passwordEncoder.matches(oldPassword, userEntity.getPassword()))) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Stare hasło nieprawidłowe");
            return ResponseEntity.badRequest().body(response);
        } else {
            userService.setNewPassword(userEntity, passwordEncoder.encode(newPassword));
            Map<String, String> response = new HashMap<>();
            response.put("message", "Hasło zmienione poprawnie, wyloguj i zaloguj się ponownie aby zastosować zmiany");
            return ResponseEntity.ok(response);
        }
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<Map<String, String>> deleteAccount(Authentication authentication) {
        var user = authentication.getName();
        var userEntity = userService.getUserByEmail(user);

        userService.deleteUser(userEntity);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Konto usunięte, wyloguj się");
        return ResponseEntity.ok(response);
    }
}
