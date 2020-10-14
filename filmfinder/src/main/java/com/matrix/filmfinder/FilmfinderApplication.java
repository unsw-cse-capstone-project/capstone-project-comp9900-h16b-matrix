package com.matrix.filmfinder;

import com.matrix.filmfinder.model.User;
import com.matrix.filmfinder.services.FilmFinderUserDetailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

import java.util.Arrays;
import java.util.Collection;

@SpringBootApplication
public class FilmfinderApplication {

//    @Bean
//    PasswordEncoder passwordEncoder() {
//        PasswordEncoder myPasswordEncoder = new SCryptPasswordEncoder();
//        return myPasswordEncoder;
//    }
//
//    @Bean
//    void ffUserDetailService() {
//        Collection<User> users = Arrays.asList(
//                new User("Alice", "Alice@sample.com", "HaHaHa", "USER"),
//                new User("Bob", "Bob@sample.com", "123123", "USER")
//        );
//
//    }


	public static void main(String[] args) {
		SpringApplication.run(FilmfinderApplication.class, args);
	}

}
