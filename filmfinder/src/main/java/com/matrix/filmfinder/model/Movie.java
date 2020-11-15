package com.matrix.filmfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Movie")
@Table(name = "movie" )
public class Movie {
    @Id
    @Column(name = "id")
    private Integer id;
    @Column
    @JsonIgnore
    private Long n_hits = 0L;
    @Column(columnDefinition = "LONGTEXT", name = "description")
    private String description;
    @Column(name = "poster")
    private String poster;
    @Column(name = "title")
    private String title;
    @Column(name = "rating")
    private Double tmdb_rates;
    @Column(name = "rating_count")
    private Integer tmdb_rates_count;
    @Column(name = "popularity")
    private Double popularity;

    @Column(name = "release_date")
    private Date release_date;
    @OneToOne
    @JoinColumn(name = "director")
    private Director director;

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "movie", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Rate> rates = new HashSet<>();

    public Movie() {
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
        if(n_hits == null)
            n_hits = 0L;
        this.n_hits++;
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

    public Double getTmdb_rates() {
        return tmdb_rates;
    }

    public void setTmdb_rates(Double tmdb_rates) {
        this.tmdb_rates = tmdb_rates;
    }

    public Integer getTmdb_rates_count() {
        return tmdb_rates_count;
    }

    public void setTmdb_rates_count(Integer tmdb_rates_count) {
        this.tmdb_rates_count = tmdb_rates_count;
    }

    public Double getPopularity() {
        return popularity;
    }

    public void setPopularity(Double popularity) {
        this.popularity = popularity;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public Director getDirector() {
        return director;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return id.equals(movie.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", n_hits=" + n_hits +
                ", description='" + description + '\'' +
                ", poster='" + poster + '\'' +
                ", title='" + title + '\'' +
                ", popularity=" + popularity +
                ", release_date=" + release_date +
                '}';
    }
}