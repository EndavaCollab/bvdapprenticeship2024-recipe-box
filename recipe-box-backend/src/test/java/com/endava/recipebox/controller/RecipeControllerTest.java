package com.endava.recipebox.controller;

import com.endava.recipebox.dto.IngredientRequestDTO;
import com.endava.recipebox.dto.RecipeAddRequestDTO;
import com.endava.recipebox.dto.RecipeEditRequestDTO;
import com.endava.recipebox.exception.UnauthorizedActionException;
import com.endava.recipebox.service.RecipeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RecipeService recipeService;
    @Test
    void createRecipe() throws Exception {
        RecipeAddRequestDTO recipeAddRequestDTO = new RecipeAddRequestDTO();
        recipeAddRequestDTO.setName("Test Recipe");
        recipeAddRequestDTO.setDescription("This is a test recipe");
        recipeAddRequestDTO.setImageUrl("http://example.com/image.jpg");
        recipeAddRequestDTO.setCookingTime("30");
        recipeAddRequestDTO.setDifficulty("Medium");
        recipeAddRequestDTO.setServings(4);
        recipeAddRequestDTO.setRecipeStatus("public");
        recipeAddRequestDTO.setMealType("Breakfast");

        IngredientRequestDTO ingredientDTO = new IngredientRequestDTO();
        ingredientDTO.setIngredientId(1L);
        ingredientDTO.setQuantity(100);
        ingredientDTO.setUnit("grams");
        recipeAddRequestDTO.setIngredients(Collections.singletonList(ingredientDTO));

        Mockito.when(recipeService.createRecipe(Mockito.any(RecipeAddRequestDTO.class), Mockito.anyLong()))
                .thenReturn("Recipe added successfully");

        String recipeJson = objectMapper.writeValueAsString(recipeAddRequestDTO);

        mockMvc.perform(post("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(recipeJson)
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Recipe added successfully"));
    }

    @Test
    void editRecipe_UserAuthorized_ReturnsOk() throws Exception {

        String responseMessage = "Recipe update successfully!";
        Mockito.when(recipeService.updateRecipe(Mockito.any(RecipeEditRequestDTO.class), Mockito.eq(1L))).thenReturn(responseMessage);

        String recipeJson = "{ \"id\": 1, \"name\": \"New Recipe\", \"description\": \"Description\", \"imageURL\": \"http://image.url\", " +
                            "\"mealType\": \"dinner\", \"ingredients\": [{ \"name\": \"Ingredient\", \"quantity\": \"2\" }], \"cookingTime\": " +
                            "\"30 minutes\", \"difficulty\": \"easy\", \"recipeStatus\": \"public\", \"servings\": 2 }";

        mockMvc.perform(put("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(recipeJson)
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("Recipe update successfully!"));
    }

    @Test
    void editRecipe_UserUnauthorized_ReturnsForbidden() throws Exception {

        Mockito.doThrow(new UnauthorizedActionException("You do not have permission to edit this recipe"))
                .when(recipeService).updateRecipe(Mockito.any(RecipeEditRequestDTO.class), Mockito.eq(2L));

        String recipeJson = "{ \"id\": 1, \"name\": \"New Recipe\", \"description\": \"Description\", \"imageURL\": \"http://image.url\", " +
                            "\"mealType\": \"dinner\", \"ingredients\": [{ \"name\": \"Ingredient\", \"quantity\": \"2\" }], \"cookingTime\": " +
                            "\"30 minutes\", \"difficulty\": \"easy\", \"recipeStatus\": \"public\", \"servings\": 2 }";

        mockMvc.perform(put("/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(recipeJson)
                        .param("userId", "2"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$").value("{\"message\":\"You do not have permission to edit this recipe\",\"status\":403}"));
    }
}