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
            value = "select distinct m from Movie m where m.title like %?1%"
    )
    Page<Movie> getMoviesByTitleWithCustomOrder(String keyword, Pageable pageable);
    @Query(
            value = "select distinct m from Movie m where m.description like %?1%"
    )
    Page<Movie> getMoviesByDescriptionWithCustomOrder(String keyword, Pageable pageable);

    @Query(
            value = "select distinct m from Movie m " +
                    "inner join MovieToGenre mtg on m = mtg.movie " +
                    "inner join Genre g on mtg.genre = g "+
                    "where m.title like %:keyword% " +
                    "and g in :genres"
    )
    Page<Movie> getMoviesByTitleWithCustomOrderAndGenreFilter(@Param("keyword") String keyword, @Param("genres") List<Genre> genres, Pageable pageable);
    @Query(
            value = "select distinct m from Movie m " +
                    "inner join MovieToGenre mtg on m = mtg.movie " +
                    "inner join Genre g on mtg.genre = g "+
                    "where m.description like %:keyword% " +
                    "and g in :genres"
    )
    Page<Movie> getMoviesByDescriptionWithCustomOrderAndGenreFilter(@Param("keyword")String keyword, @Param("genres") List<Genre> genres, Pageable pageable);


    Movie getMovieById(Integer id);
    Movie getMoviesByIdIn(List<Integer> ids);

    @Query(
            nativeQuery = true,
            value = "Select distinct(m.id), description, popularity, poster, release_date, m.title, m.rating, rating_count, director, n_hits " +
                    "from movie m right join movie_to_genre mtg on m.id = mtg.movie_id " +
                    "left join (select * from comment c where c.user_id = ?1) as c " +
                    "on m.id = c.movie_id " +
                    "left join (select * from review r where r.user_id = ?1) as r " +
                    "on m.id = r.movie_id " +
                    "left join (select * from rate r2 where r2.user_id = ?1) as r2 " +
                    "on m.id = r2.movie_id " +
                    "where mtg.genre_id in " +
                    "(select g.genre_id from movie mo right join movie_to_genre g on mo.id = g.movie_id where mo.id = ?2) " +
                    "and m.id != ?2 " +
                    "and c.id is null " +
                    "and r.id is null " +
                    "and r2.id is null " +
                    "order by m.popularity desc " +
                    "limit 8 "
    )
    List<Movie> recommendByGenre(User user, Movie movie);

    @Query(
            nativeQuery = true,
            value = "Select distinct(m.id), description, popularity, poster, release_date, m.title, m.rating, rating_count, director, n_hits " +
                    "from movie m right join movie_to_genre mtg on m.id = mtg.movie_id " +
                    "where mtg.genre_id in " +
                    "(select g.genre_id from movie mo right join movie_to_genre g on mo.id = g.movie_id where mo.id = ?1) " +
                    "order by m.popularity desc " +
                    "limit 8 "
    )
    List<Movie> recommendByGenreWithoutUser( Movie movie);
    @Query(
            nativeQuery = true,
            value = "Select distinct(m.id), description, popularity, poster, release_date, m.title, m.rating, rating_count, director, n_hits " +
                    "from movie m right join director d on d.id = m.director " +
                    "left join (select * from comment c where c.user_id = ?1) as c " +
                    "on m.id = c.movie_id " +
                    "left join (select * from review r where r.user_id = ?1) as r " +
                    "on m.id = r.movie_id " +
                    "left join (select * from rate r2 where r2.user_id = ?1) as r2 " +
                    "on m.id = r2.movie_id " +
                    "where m.director in " +
                    "(select mo.director from movie mo where mo.id = ?2) " +
                    "and m.id != ?2 " +
                    "and c.id is null " +
                    "and r.id is null " +
                    "and r2.id is null " +
                    "order by m.popularity desc " +
                    "limit 8 "
    )
    List<Movie> recommendByDirector(User user, Movie movie);
    @Query(
            nativeQuery = true,
            value = "Select distinct(m.id), description, popularity, poster, release_date, m.title, m.rating, rating_count, director, n_hits " +
                    "from movie m right join director d on d.id = m.director " +
                    "left join (select * from comment c where c.user_id = ?1) as c " +
                    "on m.id = c.movie_id " +
                    "left join (select * from review r where r.user_id = ?1) as r " +
                    "on m.id = r.movie_id " +
                    "left join (select * from rate r2 where r2.user_id = ?1) as r2 " +
                    "on m.id = r2.movie_id " +
                    "left join movie_to_genre mtg on m.id = mtg.movie_id " +
                    "where mtg.genre_id in " +
                    "(select g.genre_id from movie mo right join movie_to_genre g on mo.id = g.movie_id where mo.id = ?2) " +
                    "or m.director in " +
                    "(select mov.director from movie mov where mov.id = ?2) " +
                    "and m.id != ?2 " +
                    "and c.id is null " +
                    "and r.id is null " +
                    "and r2.id is null " +
                    "order by m.popularity desc " +
                    "limit 8 "
    )
    List<Movie> recommendByDirectorAndGenre(User user, Movie movie);
}
