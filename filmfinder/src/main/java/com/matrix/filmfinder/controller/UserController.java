package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
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

@Controller
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    public UserController(UserRepository userRepository){
//        this.userRepository = userRepository;
//    }

//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//    private final FilmFinderUserDetailService userDetailService = new FilmFinderUserDetailService();

    @Bean
    private final PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    private final FilmFinderUserDetails userDetails(String username) {


    @PostMapping(path="/registration")
    public @ResponseBody String addNewUser(@RequestBody ObjectNode jsonNode) {
        User user = new User();
        String name = jsonNode.get("name").asText();

        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder().encode(password));
        userRepository.save(user);
        String res = "User " + user.toString() + " saved.";
        return res;
    }
    //TODO
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
            }

        }
        else {
            return  "Wrong password";
           
        }
        return userJson;
    }
//    @PostMapping(path="/addWithPassword")
//    public@ResponseBody String

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
//    @GetMapping(path="/{name}")
//    public @ResponseBody String
    @GetMapping(path="/name/{name}")
    public @ResponseBody User returnUser(@PathVariable("name") String name) {
        return userRepository.findByName(name);
    }

}
