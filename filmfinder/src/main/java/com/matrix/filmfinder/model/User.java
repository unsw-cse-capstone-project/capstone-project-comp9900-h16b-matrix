package com.matrix.filmfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

/**
 * An Entity managing user table, it stores username, e-mail, and encrypted password
 */
@Entity(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
    private int id;
    @Column(unique = true)
    @NonNull
    @NotBlank(message = "username is necessary")
    private String name;
    @Column(unique = true)
    @NonNull
    @NotBlank(message = "email is necessary")
    private String email;
    @Column
    @NotBlank(message = "password cannot be blank")
    @JsonIgnore
    private String password;
    @Column
    @JsonIgnore
    private String oauth2_token;
    @Column
    @JsonIgnore
    private Boolean isActive;
    @Column
    private Boolean genre = true;
    @Column
    private Boolean director = false;

    public User() {
        this.isActive = true;
    }

    public User(Integer id) {
        this.id = id;
        this.isActive = true;
    }

    public Boolean getGenre() {
        return genre;
    }

    public void setGenre(Boolean genre) {
        this.genre = genre;
    }

    public Boolean getDirector() {
        return director;
    }

    public void setDirector(Boolean director) {
        this.director = director;
    }

    public String getName() { return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
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
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

//    public JSON toJson() {
//
//    }




}


