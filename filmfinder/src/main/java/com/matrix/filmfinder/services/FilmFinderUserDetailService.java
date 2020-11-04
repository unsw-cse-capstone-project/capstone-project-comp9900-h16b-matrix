package com.matrix.filmfinder.services;

import com.matrix.filmfinder.dao.UserRepository;
import com.matrix.filmfinder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class FilmFinderUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username);
        if (user == null) {
            String exceptionMsg = "Couldn't find username " + username;
            throw new UsernameNotFoundException(exceptionMsg);
        }
        return new FilmFinderUserDetails(user);
    }
}
