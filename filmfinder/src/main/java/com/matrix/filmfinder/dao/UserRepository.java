package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID> {
//    User save(User user);
//    Optional<User> findById(Integer Id);
//    List<User>v

}
