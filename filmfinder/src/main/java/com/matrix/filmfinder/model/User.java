package com.matrix.filmfinder.model;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity(name = "User")
public class User {
    @Id
    @GeneratedValue
    @NonNull
    @JsonIgnore
    private UUID id;
    @Column(unique = true)
    @NonNull
    private String name;
    @Column(unique = true)
    @NonNull
    private String email;
    @Column
    @JsonIgnore
    private String password;
    @Column
    @JsonIgnore
    private String oauth2_token;

    public User() {
    }

    public User(String name, @NonNull String email) {
        this.name = name;
        this.email = email;
    }

    public User(UUID id, String name, String email, String password, String oauth2_token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.oauth2_token = oauth2_token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id) &&
                Objects.equals(name, user.name) &&
                email.equals(user.email) &&
                Objects.equals(password, user.password) &&
                Objects.equals(oauth2_token, user.oauth2_token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, password, oauth2_token);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id.toString() +
                ", name='" + name + '\'' +
                '}';
    }

//    public JSON toJson() {
//
//    }


}


