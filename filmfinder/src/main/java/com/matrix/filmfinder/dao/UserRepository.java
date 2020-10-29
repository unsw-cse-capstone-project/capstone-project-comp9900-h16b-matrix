package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {
//    User save(User user);
//    Optional<User> findById(Integer Id);
//    List<User>v
    User findByName(String name);
    User findByEmail(String email);

}
