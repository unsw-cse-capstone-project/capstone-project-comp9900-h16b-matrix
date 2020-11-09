package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
