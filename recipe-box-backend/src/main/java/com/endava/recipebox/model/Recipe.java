package com.endava.recipebox.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "RECIPE")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "servings", nullable = false)
    private int servings;

    @Column(name = "kcal_serving", nullable = false)
    private int kcalServing;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "difficulty")
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(name = "preparation_time", nullable = false)
    private int preparationTime;

    @Column(name = "imageUrl", nullable = false)
    private String imageUrl;

    @Column(name = "mealType")
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeIngredient> recipeIngredients;

    @Column(name = "recipeStatus")
    @Enumerated(EnumType.STRING)
    private RecipeStatus recipeStatus;

}
