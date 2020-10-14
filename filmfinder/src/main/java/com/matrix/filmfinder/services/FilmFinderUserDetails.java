package com.matrix.filmfinder.services;

import com.matrix.filmfinder.model.User;
import org.bouncycastle.pqc.crypto.gmss.util.GMSSRandom;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class FilmFinderUserDetails implements UserDetails {
    private String name;
    private String password;
    private List<GrantedAuthority> authorities = new ArrayList<>();
    private Boolean isActivate;

    public FilmFinderUserDetails(User user) {
        this.name = user.getName();
        this.password = user.getPassword();
        this.authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        this.isActivate = user.getActive();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}
