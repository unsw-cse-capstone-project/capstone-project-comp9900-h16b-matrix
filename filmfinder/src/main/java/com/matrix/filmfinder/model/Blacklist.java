package com.matrix.filmfinder.model;

import com.sun.istack.NotNull;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "Backlist")
public class Blacklist {
    @Id
    @NonNull
    @GeneratedValue
    private UUID id;
    @Column
    private UUID uid;
    @Column
    private UUID banned_id;

    public Blacklist() {
    }

    public Blacklist(UUID id, UUID uid, UUID banned_id) {
        this.id = id;
        this.uid = uid;
        this.banned_id = banned_id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUid() {
        return uid;
    }

    public void setUid(UUID uid) {
        this.uid = uid;
    }

    public UUID getBanned_id() {
        return banned_id;
    }

    public void setBanned_id(UUID banned_id) {
        this.banned_id = banned_id;
    }


}
