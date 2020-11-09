package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
//    List<Wishlist> getWishlistsByUid(Integer uid);
//    List<Wishlist> getWishlistsByUser(User user);

//    List<Wishlist> findByUidAndMovie(Integer uid, Integer movie_id);
//    Wishlist findByUidAndMovie_id(Integer uid, Integer movie_id);
    Wishlist getWishlistByUserAndMovie(User u, Movie m);
}
