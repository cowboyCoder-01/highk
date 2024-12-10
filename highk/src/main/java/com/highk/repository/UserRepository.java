package com.highk.repository;

import com.highk.model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    
    // Custom query methods with Optional return types to avoid NullPointerException

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
