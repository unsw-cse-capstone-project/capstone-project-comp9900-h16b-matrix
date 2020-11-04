package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//    User save(User user);
//    Optional<User> findById(Integer Id);
//    List<User>v
    User findByName(String name);
    User getUserById(Integer id);
    User findByEmail(String email);

}



