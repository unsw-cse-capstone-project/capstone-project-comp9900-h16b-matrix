package com.matrix.filmfinder.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser(@RequestBody ObjectNode jsonNode) {
        User user = new User();
        String name = jsonNode.get("name").asText();
        String email = jsonNode.get("email").asText();
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);
        String res = "User " + user.toString() + " saved.";
        return res;
    }
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
