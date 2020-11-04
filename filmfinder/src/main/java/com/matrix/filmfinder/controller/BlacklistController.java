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

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping(path = "/black")
public class BlacklistController {
    @Autowired
    private BlacklistRepository blacklistRepository;

    // search
    @GetMapping(path = "/getAll")
    public ResponseEntity<Object> searchBlacklist(
            @RequestParam User uid
    ) {
        try {        // success
            List<Blacklist> blacklist = blacklistRepository.findBlacklistByUser(uid);
            return new ResponseEntity<>(
                    blacklist,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(
                    "Cannot find",
                    HttpStatus.NOT_FOUND
            );
        }

    }
    // add blacklist
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addBlack(
            @RequestParam(name = "uid") User uid,
            @RequestParam(name = "banned_uid") User banned_uid) {
        Blacklist bl = new Blacklist();
        bl.setUser(uid);
        bl.setBanned_user(banned_uid);
        blacklistRepository.save(bl);

        // if success
        return new ResponseEntity<>(
                bl,
                HttpStatus.OK
        );
    }

    // delete blacklist
    @DeleteMapping(path = "/delete")
    public ResponseEntity<Object> deleteBlacklist(
            @RequestParam Integer id
    ) {
        blacklistRepository.deleteById(id);

        // success
        return new ResponseEntity<>(
                "You already release this user from your Blacklist",
                HttpStatus.OK
        );
    }
}
