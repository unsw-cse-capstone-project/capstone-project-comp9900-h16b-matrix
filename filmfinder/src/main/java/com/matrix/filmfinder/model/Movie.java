package com.matrix.filmfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.URL;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Movie")
public class Movie {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    @NonNull
    private String tmdb_id;
    @Column
    private Long n_hits;//review
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @Column
    private String poster;
    @Column
    private String title;

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Rate> rates = new HashSet<>();

    public Movie() {
    }
    public Movie(String tmdb_id) {
        this.tmdb_id = tmdb_id;
    }

    public Movie(String description, String poster) {
        this.description = description;
        this.poster = poster;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Rate> getRates() {
        return rates;
    }

    public void setRates(Set<Rate> rates) {
        this.rates = rates;
    }

    public Integer getId() {
        return id;
    }

    public String getTmdb_id() {
        return tmdb_id;
    }

    public Long getN_hits() {
        return n_hits;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setN_hits(Long n_hits) {
        this.n_hits = n_hits;
    }

    public void incN_hits() {
        this.n_hits++;
    }

    public void setTmdb_id(String tmdb_id) {
        this.tmdb_id = tmdb_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return id.equals(movie.id);
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", tmdb_id='" + tmdb_id + '\'' +
                ", n_hits=" + n_hits +
                ", comments=" + comments +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}