import React, { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/close copy.svg";
import SelectInput from "../../components/SelectInput/SelectInput";
import { useNavigate } from "react-router-dom";

import "./AddRecipe.css";

import * as Utils from "./utils";

export default function AddRecipe() {
    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const defaultIngredient = {
        ingredientID: 0,
        unit: "grams",
    };

    const [ingredients, setIngredients] = useState<
        Utils.IngredientRequestDTO[]
    >([{ ...defaultIngredient, ingredientName: "", quantity: 0 }]);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<Utils.ImageFile | null>(null);

    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(0);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);

    const totalPreparationTime = preparationHours * 60 + preparationMinutes;

    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            {
                ...defaultIngredient,
                ingredientID: ingredients.length,
                ingredientName: "",
                quantity: 0,
            },
        ]);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const selectedIngredient = Utils.ingredientOptions.find(
            (ingredient) => ingredient.name === value
        );

        const newIngredients = [...ingredients];
        newIngredients[index] = {
            ...newIngredients[index],
            ingredientName: value,
            ingredientID: selectedIngredient ? selectedIngredient.id : 0,
        };
        setIngredients(newIngredients);
    };
    const handleIngredientQuantityChange = (index: number, value: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], quantity: value };
        setIngredients(newIngredients);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({
                    fileName: file.name,
                    fileData: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const incompleteFields = {
        recipeNameError: !recipeName,
        preparationTimeError: !totalPreparationTime,
        difficultyError: !difficulty,
        categoryError: !category,
        servingsError: !servings,
        ingredientsError: ingredients.some(
            (ingredient) => !ingredient.ingredientName || !ingredient.quantity
        ),
        recipeImageError: !image,
    };

    const submitIsDisabled =
        incompleteFields.recipeNameError ||
        incompleteFields.preparationTimeError ||
        incompleteFields.difficultyError ||
        incompleteFields.categoryError ||
        incompleteFields.servingsError ||
        incompleteFields.ingredientsError ||
        incompleteFields.recipeImageError;

    const handleSaveRecipe = async () => {
        // const imageUrl = image ? await uploadImage(image.fileData) : '';   // de decomentat daca o sa putem trimite o imagine
        const imageUrl = image?.fileName;

        const recipeData: Utils.RecipeAddRequestDTO = {
            name: recipeName,
            description,
            difficulty,
            mealType: category,
            servings,
            imageUrl,
            ingredients,
            cookingTime: totalPreparationTime,
        };

        try {
            const response = await fetch(`/recipes?userId=${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error("Error in submitting recipe");
            }

            const data = await response.json();
            console.log("Recipe successfully added:", data);
            alert("Recipe successfully added.");
            navigate("/recipes/list");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! The recipe has not been added.");
            // navigate("/recipes/list"); //TESTING
        }
    };

    return (
        <>
            <Header />
            <div className="add-recipe-container">
                <div className="add-recipe-fields">
                    <div className="left-column">
                        <div>Recipe Name*</div>
                        <input
                            type="text"
                            placeholder="Recipe name"
                            className="recipe-name-input-box"
                            value={recipeName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setRecipeName(e.target.value)
                            }
                        />

                        <div>Preparation time*</div>
                        <div className="preparation-time-container">
                            <SelectInput
                                value={preparationHours}
                                onChange={(e) =>
                                    setPreparationHours(Number(e.target.value))
                                }
                                options={Utils.preparationHoursValues}
                                placeholder="HH"
                                hasError={incompleteFields.preparationTimeError}
                            />

                            <SelectInput
                                value={preparationMinutes}
                                onChange={(e) =>
                                    setPreparationMinutes(
                                        Number(e.target.value)
                                    )
                                }
                                options={Utils.preparationMinutesValues}
                                placeholder="MM"
                                hasError={incompleteFields.preparationTimeError}
                            />
                        </div>

                        <div>Difficulty*</div>
                        <SelectInput
                            value={difficulty}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setDifficulty(e.target.value)
                            }
                            options={Utils.difficultyValues}
                            placeholder="Choose difficulty"
                            hasError={incompleteFields.difficultyError}
                        />

                        <div>Category*</div>

                        <SelectInput
                            className="recipe-name-input-box"
                            value={category}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setCategory(e.target.value)
                            }
                            options={Utils.categoryValues}
                            placeholder="Select category"
                            hasError={incompleteFields.categoryError}
                        />

                        <div>Servings*</div>

                        <SelectInput
                            value={servings}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setServings(Number(e.target.value))
                            }
                            options={Utils.servingsValues}
                            placeholder="Select servings"
                            hasError={incompleteFields.servingsError}
                        />

                        <div>Ingredient name*</div>

                        {ingredients.map((ingredient, index) => (
                            <div style={{ margin: "0 0 10px 0" }}>
                                <SelectInput
                                    key={index}
                                    value={ingredient.ingredientName}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    options={Utils.ingredientOptions.map(
                                        (ingredient) => ({
                                            value: ingredient.id,
                                            label: ingredient.name,
                                        })
                                    )}
                                    placeholder="Select ingredient"
                                    className="recipe-name-input-box"
                                />
                            </div>
                        ))}

                        <button
                            className="add-ingredient-button"
                            onClick={handleAddIngredient}
                        >
                            + ADD INGREDIENT
                        </button>

                        <button
                            disabled={submitIsDisabled}
                            className="save-recipe-button"
                            onClick={handleSaveRecipe}
                        >
                            SAVE RECIPE
                        </button>
                    </div>

                    <div className="right-column">
                        <div>Recipe Image*</div>

                        {!image && (
                            <div
                                className="add-image-button-dashed-border"
                                style={{ margin: 0 }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="file-input"
                                    style={{ display: "none" }}
                                />
                                <label
                                    htmlFor="file-input"
                                    className="custom-file-upload"
                                >
                                    + ADD IMAGE
                                </label>
                            </div>
                        )}
                        {image && (
                            <div
                                className="added-image-dashed-border"
                                style={{ margin: 0 }}
                            >
                                <div
                                    className="image-file-name"
                                    style={{
                                        margin: "15px 10px",
                                    }}
                                >
                                    <CheckIcon className="check-icon" />
                                    {image.fileName}
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={handleRemoveImage}
                                    />
                                </div>
                            </div>
                        )}

                        <div>Description</div>
                        <textarea
                            className="description-input"
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setDescription(e.target.value)
                            }
                        />

                        <div style={{ marginBottom: 6 }}>
                            Ingredient Quantity*
                        </div>

                        {ingredients.map((ingredient, index) => (
                            <div style={{ margin: "0 0 10px 0" }}>
                                <SelectInput
                                    key={index}
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientQuantityChange(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                    options={Utils.quantityOptions.map(
                                        (option) => ({
                                            value: option.value,
                                            label: option.label,
                                        })
                                    )}
                                    placeholder="Select ingredient quantity"
                                    className="recipe-name-input-box"
                                    hasError={incompleteFields.ingredientsError}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
