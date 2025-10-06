package com.svet.authservice.services;

import com.svet.authservice.dto.JwtDto;
import com.svet.authservice.dto.RefreshTokenDto;
import com.svet.authservice.dto.UserCredentials;
import com.svet.authservice.dto.UserDto;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.client.HttpClientErrorException;

import javax.naming.AuthenticationException;

public interface UserService {
    JwtDto signIn(UserCredentials userCredentials) throws AuthenticationException;
    JwtDto refreshToken(RefreshTokenDto refreshTokenDto) throws Exception;
    UserDto createUser(UserDto userDto) throws Exception;
    UserDto getUserById(Long id) throws ChangeSetPersister.NotFoundException;
    UserDto getUserByUsername(String username) throws ChangeSetPersister.NotFoundException;
}
