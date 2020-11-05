package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.dao.WishlistRepository;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.model.Wishlist;
import org.hibernate.annotations.GeneratorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;

@RestController
@RequestMapping(path = "/wishlist")
public class WishlistController {
    private WishlistRepository wishlistRepository;
    private MovieRepository movieRepository;
    private UserRepository userRepository;

    @Autowired
    public WishlistController(WishlistRepository wishlistRepository, MovieRepository movieRepository, UserRepository userRepository){
        this.wishlistRepository = wishlistRepository;
        this.movieRepository =movieRepository;
        this.userRepository = userRepository;
    }

    // Add
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addWishlist(
            @RequestParam(name = "uid") User uid,
            @RequestParam(name = "movie_id") Movie movie_id
            )
    {
        Wishlist wishlist = new Wishlist();
        wishlist.setUid(uid);
        wishlist.setMovie_id(movie_id);
        wishlistRepository.save(wishlist);
        return new ResponseEntity<>(
                wishlist,
                HttpStatus.OK
        );
    }
    // Search
    // @GetMapping(value = "/get")
    // public ResponseEntity<Object> getWishlist(@RequestParam Integer uid){
    //     try {
    //         User user = userRepository.getOne(uid);
    //         Wishlist wishlist = wishlistRepository.getWishlistByUser(user);
    //         return new ResponseEntity<>(
    //                 wishlist,
    //                 HttpStatus.OK
    //         );
    //     } catch (EntityNotFoundException e) {
    //         return new ResponseEntity<>(
    //                 "EntityNotFound",
    //                 HttpStatus.NOT_FOUND
    //         );
    //     }
    // }
    // Delete
    @DeleteMapping(value = "/delete")
    public ResponseEntity<Object> deleteWishlist(@RequestParam Integer id){
        try {
            wishlistRepository.deleteById(id);
        } catch (NoResultException e) {
            return new ResponseEntity<>(
                    "Wishlist is empty",
                    HttpStatus.BAD_REQUEST
            );
        }
        return new ResponseEntity<>(
                "Successful! The movie is deleted in your Wishlist",
                HttpStatus.OK
        );
    }
}
