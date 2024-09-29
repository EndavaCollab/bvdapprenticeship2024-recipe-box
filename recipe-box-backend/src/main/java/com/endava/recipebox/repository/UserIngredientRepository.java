package com.endava.recipebox.repository;

import com.endava.recipebox.model.UserIngredient;
import com.endava.recipebox.model.UserIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserIngredientRepository extends JpaRepository<UserIngredient, UserIngredientId> {
}
