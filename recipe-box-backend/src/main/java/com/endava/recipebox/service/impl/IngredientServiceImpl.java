package com.endava.recipebox.service.impl;

import com.endava.recipebox.dto.IngredientsAllRequestDTO;
import com.endava.recipebox.dto.UserIngredientDTO;
import com.endava.recipebox.exception.BadRequestException;
import com.endava.recipebox.mapper.IngredientMapper;
import com.endava.recipebox.model.*;
import com.endava.recipebox.repository.IngredientRepository;
import com.endava.recipebox.repository.UserIngredientRepository;
import com.endava.recipebox.repository.UserRepository;
import com.endava.recipebox.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;
    private final UserIngredientRepository userIngredientRepository;
    private final UserRepository userRepository;
    private final IngredientMapper ingredientMapper;

    @Autowired
    public IngredientServiceImpl(IngredientRepository ingredientRepository, UserIngredientRepository userIngredientRepository, UserRepository userRepository, IngredientMapper ingredientMapper) {
        this.ingredientRepository = ingredientRepository;
        this.userIngredientRepository = userIngredientRepository;
        this.userRepository = userRepository;
        this.ingredientMapper = ingredientMapper;
    }

    @Override
    public List<IngredientsAllRequestDTO> getAllIngredients() {
        return ingredientMapper.toIngredientsAllRequestDTOList(ingredientRepository.findAll());
    }

    @Override
    public User getUserById(Long userId) {
        Optional<User> UserOptional = userRepository.findById(userId);
        if (UserOptional.isEmpty()) {
            throw new BadRequestException("User with ID " + userId + " not found.");
        }
        return UserOptional.get();
    }

    @Override
    public List<UserIngredientDTO> toUserIngredientsDTO(List<UserIngredient> userIngredients) {
        return userIngredients.stream()
                .map(userIngredient -> {
                    UserIngredientDTO userIngredientDTO = ingredientMapper.toUserIngredientDTO(userIngredient.getIngredient());
                    userIngredientDTO.setQuantity(userIngredient.getQuantity());

                    return userIngredientDTO;
                }).toList();
    }

    @Override
    public List<UserIngredientDTO> getUserIngredients(Long userId) {
        User user = getUserById(userId);
        if (user.getRole().equals(Role.Guest)) {
            throw new BadRequestException("The user must have either a Chef or Admin role to access this type of data.");
        }

        if (user.getUserIngredients().isEmpty()) {
            final int defaultQuantity = 0;

            List<UserIngredient> userIngredients = ingredientRepository.findAll().stream()
                    .map(ingredient -> UserIngredient.builder()
                            .id(new UserIngredientId(userId, ingredient.getId()))
                            .ingredient(ingredient)
                            .user(user)
                            .quantity(defaultQuantity)
                            .build())
                    .toList();
            userIngredientRepository.saveAll(userIngredients);
            return toUserIngredientsDTO(userIngredients);
        }
        
        return toUserIngredientsDTO(user.getUserIngredients());
    }
}
