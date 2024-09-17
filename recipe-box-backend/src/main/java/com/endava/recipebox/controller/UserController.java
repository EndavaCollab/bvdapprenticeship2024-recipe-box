package com.endava.recipebox.controller;

import com.endava.recipebox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @RequestMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody String username) {
        if (username == null || username.length() < 5) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(String.format("The required parameter is null or has less than 5 characters."));
        }
        return ResponseEntity.ok(userService.findOrSaveUser(username));
    }
}
