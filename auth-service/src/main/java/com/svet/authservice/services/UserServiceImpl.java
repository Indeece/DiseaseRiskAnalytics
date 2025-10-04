package com.svet.authservice.services;

import com.svet.authservice.dto.JwtDto;
import com.svet.authservice.dto.RefreshTokenDto;
import com.svet.authservice.dto.UserCredentials;
import com.svet.authservice.dto.UserDto;
import com.svet.authservice.entities.User;
import com.svet.authservice.enums.ERole;
import com.svet.authservice.repositories.RoleRepo;
import com.svet.authservice.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder encoder;

    @Override
    public JwtDto signIn(UserCredentials userCredentials) throws AuthenticationException {
        return null;
    }

    @Override
    public JwtDto refreshToken(RefreshTokenDto refreshTokenDto) throws Exception {
        return null;
    }

    @Override
    public String createUser(UserDto userDto) throws Exception {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(encoder.encode(userDto.getPassword()));
        user.setUsername(userDto.getUsername());
        user.setRoles(Set.of(roleRepo.findByName(ERole.ROLE_USER).get()));
        userRepo.save(user);
        return "User created";
    }

    @Override
    public MyUserDetails getUserById(Long id) throws HttpClientErrorException.NotFound {
        return null;
    }

    @Override
    public MyUserDetails getUserByUsername(String username) throws HttpClientErrorException.NotFound {
        return null;
    }
}
