//package com.matrix.filmfinder.model;
//
//
//import org.springframework.security.core.GrantedAuthority;
//
//import javax.persistence.*;
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//public class Authority implements GrantedAuthority {
//    @Id
//    @GeneratedValue
//    private int Id;
//
//    @Column
//    private String name;
//
//    @ManyToMany(mappedBy = "role")
//    private Set<User> users = new HashSet<>();
//
//
//    @Override
//    public String getAuthority() {
//        return name;
//    }
//}
