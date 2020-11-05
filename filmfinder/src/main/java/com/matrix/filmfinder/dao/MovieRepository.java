package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query(
            value = "Select m from Movie m where m.tmdb_id = ?1"
    )
    Movie findMovieByTmdb_id(String tmdb_id);

    @Query(
            value = "Select m from Movie m where m.tmdb_id = ?1"
    )
    Movie getMovieByTmdb_id(String tmdb_id);

    List<Movie> findByIdIn(List<Wishlist> wishlists);
//    @Query(
//            value = "select c from Movie m left join Comment c where m.tmdb_id = ?1"
//    )
//    List<Comment> getCommentsByTmdb_id(String tmdb_id);

}
