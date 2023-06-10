package com.example.gigachatb.user;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository  userRepository;
    private final UserMapper userMapper = new UserMapper();
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
        return userMapper.mapUsers(users);
    }



    public List<UserResponse> searchUsers(String searchTerm) {
        var users = userRepository.searchUsers(searchTerm);
        return userMapper.mapUsers(users);
    }

    public List<User> getUsersByUniqueID(List<String> participants) {
        var userList = new ArrayList<User>();
        participants.forEach(
                participant -> {
                    if(userRepository.findByUniqueID(participant).isEmpty()) {
                        throw new IllegalArgumentException("User not found");
                    }else{
                        userList.add(userRepository.findByUniqueID(participant).get());
                    }

                }
        );
        return userList;
    }


}
