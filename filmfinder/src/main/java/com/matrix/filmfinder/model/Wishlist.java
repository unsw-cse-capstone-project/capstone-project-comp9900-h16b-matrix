package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Wishlist")
public class Wishlist {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    private Movie movie_id;
    @ManyToOne
    private User uid;

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

    public Movie getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(Movie movie_id) {
        this.movie_id = movie_id;
    }

    public User getUid() {
        return uid;
    }

    public void setUid(User uid) {
        this.uid = uid;
    }
}
