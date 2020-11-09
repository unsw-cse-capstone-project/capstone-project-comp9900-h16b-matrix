package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @Column
    private Movie genre;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Genre genre = (Genre) obj;
        return id.equals(genre.id);
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

    public Movie getGenre() {
        return genre;
    }

    public void setGenre(Movie genre) {
        this.genre = genre;
    }
}
