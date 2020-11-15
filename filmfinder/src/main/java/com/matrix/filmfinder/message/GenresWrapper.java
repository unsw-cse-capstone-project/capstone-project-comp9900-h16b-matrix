package com.matrix.filmfinder.message;

import com.matrix.filmfinder.model.Genre;

import java.util.List;

public class GenresWrapper {
    private List<Genre> genres;

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public GenresWrapper() {
    }
}
