package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Genre;
import com.matrix.filmfinder.model.Movie;
import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.model.Wishlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query(
            value = "select m from Movie m where m.title like %?1%"
    )
    Page<Movie> getMoviesByTitleWithCustomOrder(String keyword, Pageable pageable);
    @Query(
            value = "select m from Movie m where m.description like %?1%"
    )
    Page<Movie> getMoviesByDescriptionWithCustomOrder(String keyword, Pageable pageable);

    @Query(
            value = "select m from Movie m " +
                    "inner join MovieToGenre mtg on m = mtg.movie " +
                    "inner join Genre g on mtg.genre = g "+
                    "where m.title like %:keyword% " +
                    "and g in :genres"
    )
    Page<Movie> getMoviesByTitleWithCustomOrderAndGenreFilter(@Param("keyword") String keyword, @Param("genres") List<Genre> genres, Pageable pageable);
    @Query(
            value = "select m from Movie m " +
                    "inner join MovieToGenre mtg on m = mtg.movie " +
                    "inner join Genre g on mtg.genre = g "+
                    "where m.description like %:keyword% " +
                    "and g in :genres"
    )
    Page<Movie> getMoviesByDescriptionWithCustomOrderAndGenreFilter(@Param("keyword")String keyword, @Param("genres") List<Genre> genres, Pageable pageable);


    Movie getMovieById(Integer id);
    Movie getMoviesByIdIn(List<Integer> ids);
}
