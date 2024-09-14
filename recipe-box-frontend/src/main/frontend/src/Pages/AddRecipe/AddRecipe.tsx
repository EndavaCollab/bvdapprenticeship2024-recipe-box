import React, { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/close copy.svg";
import "./AddRecipe.css";

interface ImageFile {
    fileName: string;
    fileData: string;
}

interface RecipeAddRequestDTO {
    name: string;
    description: string;
    imageUrl: string | undefined;
    mealType: string;
    ingredients: IngredientRequestDTO[];
    cookingTime: number;
    difficulty: string;
    servings: number;
}

interface IngredientRequestDTO {
    ingredientID: number;
    ingredientName: string;
    quantity: number;
    unit: string;
}

const ingredientOptions = [
    { id: 1, name: "Flour" },
    { id: 2, name: "Sugar" },
    { id: 3, name: "Butter" },
    { id: 4, name: "Eggs" },
];

export default function AddRecipe() {
    const username = localStorage.getItem("username");

    const defaultIngredient = {
        ingredientID: 0,
        unit: "grams",
    };

    // const [ingredientsQuantities, setIngredientQuantities] = useState<number[]>(
    //     [0]
    // );

    const [ingredients, setIngredients] = useState<IngredientRequestDTO[]>([
        { ...defaultIngredient, ingredientName: "", quantity: 0 },
    ]);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<ImageFile | null>(null);

    // const [ingredients, setIngredients] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(-1);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(-1);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);

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
        const selectedIngredient = ingredientOptions.find(
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

    const handleRecipeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeName(e.target.value);
    };

    const handlePreparationTimeChange = (hours: number, minutes: number) => {
        setPreparationHours(hours);
        setPreparationMinutes(minutes);
    };

    const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(e.target.value);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleServingsChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setServings(Number(e.target.value));
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
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

    const handleSaveRecipe = async () => {
        const totalPreparationTime = preparationHours * 60 + preparationMinutes;

        // const imageUrl = image ? await uploadImage(image.fileData) : '';   // de decomentat daca o sa putem trimite o imagine
        const imageUrl = image?.fileName;
        // const recipeIngredients = ingredients.map((ingredient, index) => ({
        //     ingredientId: null,
        //     ingredientName: ingredient,
        //     quantity: ingredientsQuantities[index],
        //     unit: "grams", //pe moment nu avem ingrediente lichide, so this will do for the demo
        // }));

        const recipeData: RecipeAddRequestDTO = {
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
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! The recipe has not been added.");
        }
    };

    return (
        <>
            <Header />
            <div className="add-recipe-container">
                <div className="add-recipe-fields">
                    <div className="left-column">
                        <div>Recipe Name</div>
                        <input
                            type="text"
                            placeholder="Recipe name"
                            className="recipe-name-input-box"
                            value={recipeName}
                            onChange={handleRecipeNameChange}
                        />

                        <div>Preparation time</div>
                        <div className="preparation-time-container">
                            <select
                                className={
                                    preparationHours === -1
                                        ? "prep-duration-select"
                                        : "prep-duration-selected"
                                }
                                value={preparationHours}
                                onChange={(e) =>
                                    handlePreparationTimeChange(
                                        Number(e.target.value),
                                        preparationMinutes
                                    )
                                }
                            >
                                <option value="-1" disabled hidden>
                                    HH
                                </option>
                                <option value="0">00</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>
                            <select
                                className={
                                    preparationMinutes === -1
                                        ? "prep-duration-select"
                                        : "prep-duration-selected"
                                }
                                value={preparationMinutes}
                                onChange={(e) =>
                                    handlePreparationTimeChange(
                                        preparationHours,
                                        Number(e.target.value)
                                    )
                                }
                            >
                                <option value="-1" disabled hidden>
                                    MM
                                </option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                        </div>

                        <div>Difficulty</div>
                        <select
                            className={
                                difficulty
                                    ? "ingredient-selected"
                                    : "ingredient-select"
                            }
                            value={difficulty}
                            onChange={handleDifficultyChange}
                        >
                            <option value="" disabled hidden>
                                Select difficulty
                            </option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>

                        <div>Category</div>
                        <select
                            className={
                                category
                                    ? "ingredient-selected"
                                    : "ingredient-select"
                            }
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled hidden>
                                Select category
                            </option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                        </select>

                        <div>Servings</div>
                        <select
                            className={
                                servings
                                    ? "ingredient-selected"
                                    : "ingredient-select"
                            }
                            value={servings}
                            onChange={handleServingsChange}
                        >
                            <option value="0" disabled hidden>
                                Select no. of servings
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>

                        <div>Ingredient name</div>
                        {ingredients.map((ingredient, index) => (
                            <select
                                key={index}
                                className={
                                    ingredient.ingredientName === ""
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                }
                                value={ingredient.ingredientName}
                                onChange={(e) =>
                                    handleIngredientChange(
                                        index,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="" disabled hidden>
                                    Select ingredient
                                </option>
                                {ingredientOptions.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        ))}

                        <button
                            className="add-ingredient-button"
                            onClick={handleAddIngredient}
                        >
                            + ADD INGREDIENT
                        </button>

                        <button
                            className="save-recipe-button"
                            onClick={handleSaveRecipe}
                        >
                            SAVE RECIPE
                        </button>
                    </div>

                    <div className="right-column">
                        <div>Recipe Image</div>

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
                            onChange={handleDescriptionChange}
                        />

                        <div style={{ marginBottom: 6 }}>
                            Ingredient Quantity
                        </div>
                        {ingredients.map((ingredient, index) => (
                            <select
                                key={index}
                                className={
                                    ingredient.quantity === 0
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                }
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientQuantityChange(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
                            >
                                <option value="0" disabled hidden>
                                    Select quantity
                                </option>
                                <option style={{ color: "#000" }} value="1">
                                    1
                                </option>
                                <option style={{ color: "#000" }} value="2">
                                    2
                                </option>
                                <option style={{ color: "#000" }} value="3">
                                    3
                                </option>
                                <option style={{ color: "#000" }} value="4">
                                    4
                                </option>
                                <option style={{ color: "#000" }} value="5">
                                    5
                                </option>
                                <option style={{ color: "#000" }} value="10">
                                    10
                                </option>
                                <option style={{ color: "#000" }} value="100">
                                    100
                                </option>
                            </select>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
