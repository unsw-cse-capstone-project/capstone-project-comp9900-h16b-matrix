package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Blacklist")
public class Blacklist {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)//EAGER = Load at the same time as the main class
//    @JoinColumn(name = "User_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
//    @JoinColumn(name = "User")
    private User banned_user;

    public Blacklist() {
    }

//    public Blacklist(UUID id, UUID uid, UUID banned_id) {
//        this.id = id;
//        this.uid = uid;
//        this.banned_id = banned_id;
//    }
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
