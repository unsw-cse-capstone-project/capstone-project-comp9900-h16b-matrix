package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@Controller
@RequestMapping(path="/user")
public class UserController {
//    @Autowired
    private UserRepository userRepository;

    @Autowired //Constructor
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Bean
    private final PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // registration
    @PostMapping(path="/registration")
    public @ResponseBody String addNewUser(@RequestBody ObjectNode jsonNode) {
        User user = new User();
        String name = jsonNode.get("name").asText();
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder().encode(password));// not store the true password
        userRepository.save(user); // update the information in user table
        String res = "User " + user.toString() + " saved.";
        return res;
    }
    //TODO
    //login part
    @PostMapping(path="/login")
    public @ResponseBody String loginWithUserName(@RequestBody ObjectNode jsonNode){
        String name = jsonNode.get("name").asText();
        String password = jsonNode.get("password").asText();
        User user = userRepository.findByName(name);
        ObjectMapper mapper = new ObjectMapper();
        String userJson = "";
        if (passwordEncoder().matches(password, user.getPassword())) {
            try {
                userJson = mapper.writeValueAsString(user);
            }
            catch (JsonProcessingException e){
                return "Json error";
            }

        }
        else {
            return  "Wrong password";
        }
        return userJson;
    }

    // update password
    @PostMapping(path="/update")
    public ResponseEntity<Object>  updatePassword(@RequestBody JsonNode jsonNode){
        Integer uid = jsonNode.get("id").asInt();
        String password = jsonNode.get("password").asText();
        User user = new User();
        try {
            user = userRepository.getUserById(uid);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(
                    "username doesn't exist",
                    HttpStatus.UNAUTHORIZED
            );
        }
        user.setPassword(passwordEncoder().encode(password));
        userRepository.save(user);
        return new ResponseEntity<>(
                user,
                HttpStatus.OK
        );
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path="/name/{name}")
    public @ResponseBody User returnUser(@PathVariable("name") String name) {
        return userRepository.findByName(name);
    }

    @PutMapping(path = "/recommendtype")
    public ResponseEntity<Object> updateRecommendType(@RequestBody JsonNode jsonNode) {
        Integer uid = jsonNode.get("id").asInt();
        Boolean genre = jsonNode.get("genre").asBoolean();
        Boolean director = jsonNode.get("director").asBoolean();
        User user = userRepository.getUserById(uid);
        try {
            user.setGenre(genre);
            user.setDirector(director);
            userRepository.save(user);
        } catch (EntityNotFoundException ee) {
            return new ResponseEntity<> (
                    "User not found or saving error",
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                user,
                HttpStatus.OK
        );
    }

}
