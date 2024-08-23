package com.endava.recipebox;

import com.endava.recipebox.dto.RecipeRequestDTO;
import com.endava.recipebox.dto.UserIngredientRequestDTO;
import com.endava.recipebox.model.Difficulty;
import com.endava.recipebox.model.MealType;
import com.endava.recipebox.model.Recipe;
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

import java.util.Collections;

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

    @Test
    void testCreateRecipe() throws Exception {

        RecipeRequestDTO recipeRequestDTO = new RecipeRequestDTO();
        recipeRequestDTO.setName("Test Recipe");
        recipeRequestDTO.setDescription("This is a test recipe");
        recipeRequestDTO.setImageUrl("http://example.com/image.jpg");
        recipeRequestDTO.setPreparationTime(30);
        recipeRequestDTO.setDifficulty(Difficulty.Medium);
        recipeRequestDTO.setServings(4);
        recipeRequestDTO.setPublic(true);
        recipeRequestDTO.setMealType(MealType.Breakfast);

        UserIngredientRequestDTO ingredientDTO = new UserIngredientRequestDTO();
        ingredientDTO.setIngredientId(1L);
        ingredientDTO.setQuantity(100);
        ingredientDTO.setUnit("grams");
        recipeRequestDTO.setIngredients(Collections.singletonList(ingredientDTO));

        Recipe mockRecipe = new Recipe();
        mockRecipe.setId(1L);
        mockRecipe.setName("Test Recipe");

        Mockito.when(recipeService.createRecipe(Mockito.any(RecipeRequestDTO.class), Mockito.anyLong()))
                .thenReturn(mockRecipe);

        String recipeJson = objectMapper.writeValueAsString(recipeRequestDTO);

        mockMvc.perform(post("/recipes/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(recipeJson)
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Test Recipe"));
    }

}

