package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.services.FilmFinderUserDetailService;
import com.matrix.filmfinder.services.FilmFinderUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.oauth2.client.test.OAuth2ContextConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOError;
import java.io.IOException;
import java.net.http.HttpResponse;

@Controller
@RequestMapping(path="/user")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

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
//        try {
//            UserDetails userDetails = userDetails().loadUserByUsername(name);
//        } catch(UsernameNotFoundException e) {
//
//        }v
        ObjectMapper mapper = new ObjectMapper();
        if (passwordEncoder().matches(password, user.getPassword())) {
//            mapper.
//            ObjectNode replyNode = mapper.createObjectNode();
//            replyNode.put("name", user.getName());
//            replyNode.put("encrypted_password", user.getPassword());
//            replyNode.put("email", user.getEmail());
//            replyNode.put("is_active", user.getActive());
            try {
                String ret = mapper.writeValueAsString(user);
                return ret;
            } catch (IOException io){}
//        } else {
//
        }
        return "Wrong password";
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
