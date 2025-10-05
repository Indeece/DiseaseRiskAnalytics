package com.svet.authservice.controllers;

import com.svet.authservice.dto.JwtDto;
import com.svet.authservice.dto.RefreshTokenDto;
import com.svet.authservice.dto.UserCredentials;
import com.svet.authservice.dto.UserDto;
import com.svet.authservice.services.MyUserDetails;
import com.svet.authservice.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserServiceImpl userService;

    @PostMapping("/signIn")
    public ResponseEntity<JwtDto> signIn(@RequestBody UserCredentials userCredentials) {
        JwtDto jwtDto = new JwtDto();
        try {
            jwtDto = userService.signIn(userCredentials);
            return ResponseEntity.ok(jwtDto);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(jwtDto);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) throws Exception {
        System.out.println("createUser");
        userService.createUser(userDto);
        return null;
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtDto> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) throws Exception {
        JwtDto jwt =  userService.refreshToken(refreshTokenDto);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/protected")
    public String protectedRoute() {
        return "protected";
    }
}
