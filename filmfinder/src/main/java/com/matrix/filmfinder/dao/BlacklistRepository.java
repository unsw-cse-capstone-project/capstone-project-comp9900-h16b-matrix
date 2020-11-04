package com.matrix.filmfinder.dao;

import com.matrix.filmfinder.model.Blacklist;
import com.matrix.filmfinder.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlacklistRepository extends CrudRepository<Blacklist, Integer> {
    List<Blacklist> getBlacklistByUser(User u);
    List<Blacklist> findBlacklistByUser(User u);
}
