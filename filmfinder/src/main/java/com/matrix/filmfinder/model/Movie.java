package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Integer id;
    @Column
    private String tmdb_id;
    @Column
    private Double avg_rate;//review
    @Column
    private Long n_hits;//review

    public Movie() {}
    //tmdb_id in database is int, not corresponding
    public Movie(Integer id, String tmdb_id) {
        this.id = id;
        this.tmdb_id = tmdb_id;
    }

    public Integer getId() {
        return id;
    }

    public String getTmdb_id() {
        return tmdb_id;
    }

    public Double getAvg_rate() {
        return avg_rate;
    }

    public Long getN_hits() {
        return n_hits;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setAvg_rate(Double avg_rate) {
        this.avg_rate = avg_rate;
    }

    public void setN_hits(Long n_hits) {
        this.n_hits = n_hits;
    }

    public void setTmdb_id(String tmdb_id) {
        this.tmdb_id = tmdb_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return id.equals(movie.id) &&
                tmdb_id.equals(movie.tmdb_id) &&
                Objects.equals(avg_rate, movie.avg_rate) &&
                Objects.equals(n_hits, movie.n_hits);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tmdb_id, avg_rate, n_hits);
    }
}