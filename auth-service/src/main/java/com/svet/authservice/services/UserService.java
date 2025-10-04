package com.svet.authservice.services;

import com.svet.authservice.dto.JwtDto;
import com.svet.authservice.dto.RefreshTokenDto;
import com.svet.authservice.dto.UserCredentials;
import com.svet.authservice.dto.UserDto;
import org.springframework.web.client.HttpClientErrorException;

import javax.naming.AuthenticationException;

public interface UserService {
    JwtDto signIn(UserCredentials userCredentials) throws AuthenticationException;
    JwtDto refreshToken(RefreshTokenDto refreshTokenDto) throws Exception;
    String createUser(UserDto userDto) throws Exception;
    MyUserDetails getUserById(Long id) throws HttpClientErrorException.NotFound;
    MyUserDetails getUserByUsername(String username) throws HttpClientErrorException.NotFound;
}
