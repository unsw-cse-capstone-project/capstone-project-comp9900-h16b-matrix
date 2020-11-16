package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.message.WishlistMessage;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    Wishlist getWishlistByUserAndMovie(User u, Movie m);
    @Query(
            value = "select w.id as wishlist_id, m.id as id, m.title as title, m.description as description, m.poster as poster " +
                    "from Movie m, Wishlist w " +
                    "where m = w.movie " +
                    "and w.user = ?1"
    )
    List<WishlistMessage> getWishListsByUser(User user);
}
