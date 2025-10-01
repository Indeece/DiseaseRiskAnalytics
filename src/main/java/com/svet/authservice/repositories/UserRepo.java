package com.svet.authservice.repositories;

import com.svet.authservice.entities.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo {
    Optional<Role> findByUsername(String username);
    Optional<Role> findByEmail(String email);
    Optional<Role> findById(Long id);
}
