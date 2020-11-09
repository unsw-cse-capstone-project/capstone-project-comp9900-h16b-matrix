package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Film_Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Film_GenreRepository extends JpaRepository<Film_Genre, Integer> {
}
