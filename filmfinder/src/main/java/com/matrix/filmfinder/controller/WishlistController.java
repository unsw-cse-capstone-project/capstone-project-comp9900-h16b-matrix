package com.matrix.filmfinder.controller;

import com.matrix.filmfinder.dao.MovieRepository;
import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.dao.WishlistRepository;
import com.matrix.filmfinder.message.WishlistMessage;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.model.Wishlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.List;

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
    // Search all movie from wishlist

    /**
     * get all wishlist
     * @param user
     * @return
     */
    @GetMapping(value = "/getAll")
    public ResponseEntity<Object> getWishlists(@RequestParam User user){
        try {
            List<WishlistMessage> movies = wishlistRepository.getWishListsByUser(user);

            return new ResponseEntity<>(
                    movies,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(
                    "EntityNotFound",
                    HttpStatus.NOT_FOUND
            );
        }
    }

    /**
     * get one wishlist
     * @param user
     * @param movie
     * @return
     */
    @GetMapping(value = "/get")
    public ResponseEntity<Object> getWishList(@RequestParam User user, @RequestParam Movie movie) {
        try {
            Wishlist wishlist = wishlistRepository.getWishlistByUserAndMovie(user, movie);
            return new ResponseEntity<>(
                    wishlist,
                    HttpStatus.OK
            );
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(
                    e.getMessage(),
                    HttpStatus.NOT_FOUND
            );
        }
    }
    // Add

    /**
     * add to wishlist
     * @param uid
     * @param movie_id
     * @return
     */
    @PostMapping(path = "/add")
    public ResponseEntity<Object> addWishlist(
            @RequestParam(name = "user") User uid,
            @RequestParam(name = "movie") Movie movie_id
            )
    {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(uid);
        wishlist.setMovie(movie_id);
        wishlistRepository.save(wishlist);
        return new ResponseEntity<>(
                wishlist,
                HttpStatus.OK
        );
    }
    // Delete

    /**
     * delete from wishlist
     * @param id
     * @return
     */
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
