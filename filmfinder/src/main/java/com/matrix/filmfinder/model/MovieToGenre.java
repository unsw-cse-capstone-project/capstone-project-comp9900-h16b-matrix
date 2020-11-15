package com.matrix.filmfinder.model;

import javax.persistence.*;
import javax.websocket.ClientEndpoint;
import java.util.Objects;

@Entity
@Table(
        name = "movie_to_genre",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"movie_id", "genre_id"}
                )
        }
)
public class MovieToGenre {
    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    public MovieToGenre() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovieToGenre that = (MovieToGenre) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
