package com.svet.authservice.controllers;

import com.svet.authservice.services.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final MyUserDetails userInfoService;

//    @PostMapping("/signIn")


}
