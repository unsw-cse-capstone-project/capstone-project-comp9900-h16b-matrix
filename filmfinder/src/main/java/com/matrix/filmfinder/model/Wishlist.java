package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Wishlist")
@Table(
        name = "wishlist",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "movie_id"})}
)
public class Wishlist {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @NonNull
    @JoinColumn(name = "movie_id")
    private Movie movie;
    @NonNull
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @Override
    public boolean equals(Object obj){
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Wishlist wishlist = (Wishlist) obj;
        return id.equals(wishlist.id);
    }
    @Override
    public int hashCode(){
        return Objects.hash(id);
    }

    @NonNull
    public Integer getId() {
        return id;
    }

    public void setId(@NonNull Integer id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie_id) {
        this.movie = movie_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User uid) {
        this.user = uid;
    }
}
