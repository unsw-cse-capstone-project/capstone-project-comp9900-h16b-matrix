package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Objects;

/**
 * A Entity class manage blacklist, take id as primary key. User and banned_user as foreign key to User and banned_user
 */
@Entity(name = "Blacklist")
public class Blacklist {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)//EAGER = Load at the same time as the main class
    private User user;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private User banned_user;

    public Blacklist() {
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return  false;
        Blacklist bl = (Blacklist) obj;
        return  id.equals(bl.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }

    public Integer getId() {
        return id;
    }

    public void setId(@NonNull Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getBanned_user() {
        return banned_user;
    }

    public void setBanned_user(User banned_user) {
        this.banned_user = banned_user;
    }
}
