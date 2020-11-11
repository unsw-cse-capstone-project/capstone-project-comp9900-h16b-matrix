package com.matrix.filmfinder;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.matrix.filmfinder.controller.UserController;
import com.matrix.filmfinder.model.User;
import org.junit.jupiter.api.*;
import org.junit.platform.commons.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@WebMvcTest(UserController.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class WebMockTest {
    private  MockMvc mockMvc;
    @Autowired
    private  WebApplicationContext webApplicationContext;
    @Autowired
    private UserController userController;
    @BeforeEach
    public void setup() throws Exception {
        mockMvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @Order(1)
    public void testAContextLoads() throws Exception{
        assertThat(userController).isNotNull();
    }

    @Test
    @Order(2)
    public void addCharlesAsUser() throws Exception {
        User u = new User();
        ObjectMapper om = new ObjectMapper();
        //TODO
        String responseString = mockMvc.perform(
                post("/user/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(u))
        ).andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        System.out.println(responseString);
    }
    @Test
    @Order(3)
    public void findCharlesAndReturnAsUser() throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", "charles");
        String urlString = "/user/name/" + "charles";
        String responseString = mockMvc.perform(
                get(urlString)
        ).andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        System.out.println(responseString);
    }


}
