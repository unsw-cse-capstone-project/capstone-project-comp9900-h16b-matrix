package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.BlacklistRepository;
import com.matrix.filmfinder.model.Blacklist;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/black")
public class BlacklistController {
    @Autowired
    private BlacklistRepository blacklistRepository;

    // search
    @GetMapping(path = "/search")
    public ResponseEntity<String> searchBlacklist(
            @RequestParam(name = "uid") User uid
    ) {
        Blacklist bl = new Blacklist();
        bl.setUser(uid);
        blacklistRepository.save(bl);
        // success
        return new ResponseEntity<String>(
                (MultiValueMap<String, String>) bl,
                HttpStatus.OK
        );
    }
    // add blacklist
    @PostMapping(path = "/add")
    public ResponseEntity<String> addBlack(
            @RequestParam(name = "uid") User uid,
            @RequestParam(name = "banned_uid") User banned_uid) {
        Blacklist bl = new Blacklist();
        bl.setUser(uid);
        bl.setBanned_user(banned_uid);
        blacklistRepository.save(bl);

        // if success
        // ??
        return new ResponseEntity<String>(
                (MultiValueMap<String, String>) bl,
                HttpStatus.OK
        );
    }

    // delete blacklist
    @DeleteMapping(path = "/del/{uid}&{uid}")
    public ResponseEntity<String> deleteBlacklist(
            @PathVariable User uid
    ) {
        blacklistRepository.deleteById(uid);

        // success
        return new ResponseEntity<>(
                HttpStatus.OK
        );
    }
}
