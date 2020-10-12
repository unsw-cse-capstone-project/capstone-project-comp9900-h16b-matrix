package com.matrix.filmfinder;


import com.matrix.filmfinder.controller.UserController;
import com.matrix.filmfinder.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(UserController.class)
public class WebMockTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private User user;

    @Test
    public void addUserTest() throws Exception {
        User u = new User();
        u.setName("charles");
        u.setEmail("charles@sample.com");
        //TODO
//        mockMvc.perform(post("/demo/add")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content())
    }
}
