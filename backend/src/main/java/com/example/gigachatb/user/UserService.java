package com.example.gigachatb.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository   userRepository;

    public User getUserFromRequest(ServerHttpRequest request) {
        String token = request.getHeaders().get("Authentication").get(0);
        return userRepository.findByUniqueID(token).orElseThrow();
    }

    public void addUser(User user) {
        //check if email is already in use
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        userRepository.save(user);
    }

    public void saveChanges(User user) {
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow( () -> new UsernameNotFoundException("User not found"));
    }

    public User getUserByUniqueID(String uniqueID) {
        return userRepository.findByUniqueID(uniqueID).orElseThrow( () -> new UsernameNotFoundException("User not found"));
    }

    public List<UserResponse> getAllUsers() {
        var users =  userRepository.findAll();
        UserMapper userMapper = new UserMapper();
        return userMapper.mapUsers(users);
    }
}
