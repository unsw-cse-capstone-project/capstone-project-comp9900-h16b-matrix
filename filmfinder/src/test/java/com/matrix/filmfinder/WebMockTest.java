package com.matrix.filmfinder;


import com.matrix.filmfinder.controller.UserController;
import com.matrix.filmfinder.model.User;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class WebMockTest {
    @Autowired
    private MockMvc mockMvc;


    @Test
    public void contextLoads(){

    }

    @Test
    public void addUserTest() throws Exception {
        User u = new User("charles", "charles@sample.com");
        ObjectMapper om = new ObjectMapper();
        //TODO
        String responseString = mockMvc.perform(
                post("/demo/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(u))
        ).andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        System.out.println(responseString);
    }
}
