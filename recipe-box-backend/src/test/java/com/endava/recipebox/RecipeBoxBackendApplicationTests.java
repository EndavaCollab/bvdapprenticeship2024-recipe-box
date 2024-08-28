package com.endava.recipebox;

import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.dto.UserIngredientRequestDTO;
import com.endava.recipebox.model.Difficulty;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class RecipeBoxBackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RecipeService recipeService;
    // CREATE User
    @Test
    public void shouldSaveAndReturnUserIfSuccessful() throws Exception {
        String username = "wew12";
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON)
                        .content(username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(username));

        this.mockMvc.perform(get("/login"))
                .andExpect(status().isBadRequest());
    }
}

