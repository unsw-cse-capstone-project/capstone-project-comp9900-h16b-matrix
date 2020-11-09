package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Film_Genre {
    @Id
    @GeneratedValue
    private Integer id;
    @Column
    @ManyToOne
    private Movie movie;
    @Column
    @ManyToOne
    private Genre genre;

    @Override
    public boolean equals(Object obj) {
        if (this ==obj) return true;
        if (obj == null||getClass() != obj.getClass())
            return false;
        Film_Genre fg = (Film_Genre) obj;
        return id.equals(fg.id);
    }
    @Override
    public int hashCode()
    {
        return Objects.hash(id);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }
}
