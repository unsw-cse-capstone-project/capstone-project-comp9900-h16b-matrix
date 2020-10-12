package com.matrix.filmfinder.model;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity(name = "User")
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String oauth2_token;

    public User() {
    }

    public User(UUID id, String email, String password, String oauth2_token) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.oauth2_token = oauth2_token;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOauth2_token() {
        return oauth2_token;
    }

    public void setOauth2_token(String oauth2_token) {
        this.oauth2_token = oauth2_token;
    }


}
