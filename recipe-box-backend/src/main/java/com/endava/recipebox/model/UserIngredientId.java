package com.endava.recipebox.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@EqualsAndHashCode
public class UserIngredientId implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "ingredient_id")
    private Long ingredientId;

    public UserIngredientId() {}

    public UserIngredientId(Long userId, Long ingredientId) {
        this.userId = userId;
        this.ingredientId = ingredientId;
    }
}
