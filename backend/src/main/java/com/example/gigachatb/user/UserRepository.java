package com.example.gigachatb.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUniqueID(String uniqueID);


    @Query(value = """
            SELECT u from User u\s
            where u.firstname LIKE %?1%
            OR u.lastname LIKE %?1%
            OR u.uniqueID LIKE %?1%
            """)
    List<User> searchUsers(String searchTerm);

}
