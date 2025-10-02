package com.svet.authservice.repositories;

import com.svet.authservice.entities.Role;
import com.svet.authservice.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(ERole name);
}
