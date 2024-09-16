import React, { useState, ChangeEvent } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/close copy.svg";
import SelectInput from "../../components/SelectInput/SelectInput";

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

const quantityOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 100, label: "100" },
];

export default function AddRecipe() {
    const username = localStorage.getItem("username");

    const defaultIngredient = {
        ingredientID: 0,
        unit: "grams",
    };

    const [ingredients, setIngredients] = useState<IngredientRequestDTO[]>([
        { ...defaultIngredient, ingredientName: "", quantity: 0 },
    ]);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<ImageFile | null>(null);

    const [recipeName, setRecipeName] = useState<string>("");
    const [preparationHours, setPreparationHours] = useState<number>(0);
    const [preparationMinutes, setPreparationMinutes] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [servings, setServings] = useState<number>(0);
    const [triedToSubmit, settriedToSubmit] = useState(false);

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

    // const incompleteFields = {
    //     recipeNameError: triedToSubmit && !recipeName,
    //     preparationTimeError: triedToSubmit && !totalPreparationTime,
    //     difficultyError: triedToSubmit && !difficulty,
    //     categoryError: triedToSubmit && !category,
    //     servingsError: triedToSubmit && !servings,
    //     ingredientsError:
    //         triedToSubmit &&
    //         ingredients.some(
    //             (ingredient) =>
    //                 !ingredient.ingredientName || !ingredient.quantity
    //         ),
    //     recipeImageError: triedToSubmit && !image,
    // };
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
        settriedToSubmit(true);

        if (submitIsDisabled) {
            return;
        }

        // const imageUrl = image ? await uploadImage(image.fileData) : '';   // de decomentat daca o sa putem trimite o imagine
        const imageUrl = image?.fileName;

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
            settriedToSubmit(false);
            console.log("Recipe successfully added:", data);
            alert("Recipe successfully added.");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! The recipe has not been added.");
            settriedToSubmit(true); // FOR TESTING ONLY!!!
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
                            className={`recipe-name-input-box ${
                                incompleteFields.recipeNameError
                                    ? "incomplete-field"
                                    : ""
                            }`}
                            value={recipeName}
                            onChange={handleRecipeNameChange}
                        />

                        <div>Preparation time*</div>
                        <div className="preparation-time-container">
                            <SelectInput
                                value={preparationHours}
                                onChange={(e) =>
                                    handlePreparationTimeChange(
                                        Number(e.target.value),
                                        preparationMinutes
                                    )
                                }
                                options={[
                                    { value: 1, label: "1 hour" },
                                    { value: 2, label: "2 hours" },
                                    { value: 3, label: "3 hours" },
                                ]}
                                placeholder="HH"
                                hasError={incompleteFields.preparationTimeError}
                            />

                            <SelectInput
                                value={preparationMinutes}
                                onChange={(e) =>
                                    handlePreparationTimeChange(
                                        preparationHours,
                                        Number(e.target.value)
                                    )
                                }
                                options={[
                                    { value: 15, label: "15 min" },
                                    { value: 30, label: "30 min" },
                                    { value: 45, label: "45 min" },
                                ]}
                                placeholder="MM"
                                hasError={incompleteFields.preparationTimeError}
                            />
                        </div>

                        <div>Difficulty*</div>
                        <SelectInput
                            value={difficulty}
                            onChange={handleDifficultyChange}
                            options={[
                                { value: "easy", label: "Easy" },
                                { value: "medium", label: "Medium" },
                                { value: "hard", label: "Hard" },
                            ]}
                            placeholder="Choose difficulty"
                            hasError={incompleteFields.difficultyError}
                        />

                        <div>Category*</div>

                        <SelectInput
                            value={category}
                            onChange={handleCategoryChange}
                            options={[
                                { value: "breakfast", label: "Breakfast" },
                                { value: "lunch", label: "Lunch" },
                                { value: "dinner", label: "Dinner" },
                            ]}
                            placeholder="Select category"
                            hasError={incompleteFields.categoryError}
                        />

                        <div>Servings*</div>

                        <SelectInput
                            value={servings}
                            onChange={handleServingsChange}
                            options={[
                                { value: 1, label: "1" },
                                { value: 2, label: "2" },
                                { value: 3, label: "3" },
                                { value: 4, label: "4" },
                            ]}
                            placeholder="Select servings"
                            hasError={incompleteFields.servingsError}
                        />

                        <div>Ingredient name*</div>

                        {ingredients.map((ingredient, index) => (
                            <select
                                key={index}
                                className={`${
                                    ingredient.ingredientName === ""
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                } ${
                                    incompleteFields.ingredientsError
                                        ? "incomplete-field"
                                        : ""
                                }`}
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
                                    <option
                                        style={{ color: "#000" }}
                                        key={option.id}
                                        value={option.name}
                                    >
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
                                className={`${"add-image-button-dashed-border"} ${
                                    incompleteFields.recipeImageError
                                        ? "incomplete-field"
                                        : ""
                                }`}
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
                            Ingredient Quantity*
                        </div>
                        {ingredients.map((ingredient, index) => (
                            <select
                                key={index}
                                className={`${
                                    ingredient.quantity === 0
                                        ? "ingredient-select"
                                        : "ingredient-selected"
                                } ${
                                    incompleteFields.ingredientsError
                                        ? "incomplete-field"
                                        : ""
                                }`}
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientQuantityChange(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
                            >
                                {quantityOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
