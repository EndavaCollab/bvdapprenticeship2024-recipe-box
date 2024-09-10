import React, { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddRecipe.css";

interface RecipeAddRequestDTO {
    name: string;
    description: string;
    imageUrl: string | null;
    mealType: string;
    ingredients: string[];
    cookingTime: string;
    difficulty: string;
    ingredientsQuantities: number[];
    servings: number;
}

export default function AddRecipe() {
    const [ingredientsQuantities, setIngredientQuantities] = useState<number[]>(
        [0]
    );
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);

    const [ingredients, setIngredients] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(-1);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(-1);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
        setIngredientQuantities([...ingredientsQuantities, 0]);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
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

    const handleIngredientQuantityChange = (index: number, value: number) => {
        const newIngredientQuantity = [...ingredientsQuantities];
        newIngredientQuantity[index] = value;
        setIngredientQuantities(newIngredientQuantity);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    // Todo: de inlocuit tipul pentru imagine cu un obiect ce contine numele filei si imaginea

    const handleSaveRecipe = async () => {
        const recipeData: RecipeAddRequestDTO = {
            name: recipeName,
            description,
            difficulty,
            mealType: category,
            servings,
            imageUrl: image,
            ingredients,
            ingredientsQuantities,
            cookingTime: `${preparationHours}h ${preparationMinutes}m`,
        };

        try {
            const response = await fetch("/recipes?userId=", {
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
            alert("An error occured! The recipe has not been added.");
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
                                    ingredient === ""
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                }
                                value={ingredient}
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
                                <option value="flour">Flour</option>
                                <option value="sugar">Sugar</option>
                                <option value="butter">Butter</option>
                                <option value="eggs">Eggs</option>
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
                            <>
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
                            </>
                        )}
                        {image && (
                            <div className="image-preview">
                                <img src={image} alt="Photo" />
                            </div>
                        )}

                        <div>Description</div>
                        <textarea
                            className="description-input"
                            value={description}
                            onChange={handleDescriptionChange}
                        />

                        <div>Ingredient Quantity</div>
                        {ingredientsQuantities.map((quantity, index) => (
                            <select
                                key={index}
                                className={
                                    quantity === 0
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                }
                                value={quantity}
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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="100">100</option>
                            </select>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
