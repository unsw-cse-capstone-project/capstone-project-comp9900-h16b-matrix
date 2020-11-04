package com.matrix.filmfinder.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "Backlist")
public class Blacklist {
    @Id
    @NonNull
    @GeneratedValue
    private Integer id;
    @Column
    private Integer uid;
    @Column
    private Integer banned_id;

    public Blacklist() {
    }

    public Blacklist(Integer id, Integer uid, Integer banned_id) {
        this.id = id;
        this.uid = uid;
        this.banned_id = banned_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getBanned_id() {
        return banned_id;
    }

    public void setBanned_id(Integer banned_id) {
        this.banned_id = banned_id;
    }


}
