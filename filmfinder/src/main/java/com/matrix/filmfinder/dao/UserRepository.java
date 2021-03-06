package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
    User getUserById(Integer id);
    User findByEmail(String email);

}



