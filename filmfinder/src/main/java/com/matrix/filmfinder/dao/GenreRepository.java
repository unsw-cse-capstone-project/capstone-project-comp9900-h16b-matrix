package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {
    @Query(
            value = "select g from Genre g where g.id in ?1"
    )
    List<Genre> mapIdListToGenreList(List<Integer> genre_ids);
}
