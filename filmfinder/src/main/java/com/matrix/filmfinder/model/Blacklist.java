package com.matrix.filmfinder.model;

import com.sun.istack.NotNull;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "Blacklist")
public class Blacklist {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "User")
    private User user;
    @ManyToOne
    @JoinColumn(name = "User")
    private User banned_user;

    public Blacklist() {
    }

//    public Blacklist(UUID id, UUID uid, UUID banned_id) {
//        this.id = id;
//        this.uid = uid;
//        this.banned_id = banned_id;
//    }

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
