import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icons/close copy.svg";
import SelectInput from "../SelectInput/SelectInput";
import { useNavigate, useLoaderData } from "react-router-dom";

import "./RecipeForm.css";
import { backendUrl } from "../../App";

import {
    quantityOptions,
    preparationHoursValues,
    preparationMinutesValues,
    difficultyValues,
    categoryValues,
    servingsValues,
} from "./utils";
import { Ingredient, Recipe } from "../RecipeView/types";
import { storedUserType } from "../../Utils/User";
import { UserType } from "../../enums/User";

export interface RecipeFormProps {
    isEditMode?: boolean;
}

export interface RecipeFields {
    //de redenumit pentru edit recipeformreq
    id?: number;
    name: string;
    description: string;
    imageUrl: string | undefined;
    fileName: string | undefined;
    mealType: string;
    ingredients: Ingredient[];
    cookingTime: String;
    difficulty: string;
    servings: number;
    recipeStatus: string;
}

export default function RecipeForm({
    isEditMode = false,
}: RecipeFormProps) {
    const initialRecipe = useLoaderData() as Recipe;

    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");
    const recipeId = initialRecipe?.id;

    const defaultIngredient = {
        ingredientId: 0,
        unit: "",
        ingredientName: "",
        quantity: 0,
    };

    const [recipeName, setRecipeName] = useState<string>(
        initialRecipe?.name || ""
    );
    const [preparationHours, setPreparationHours] = useState<number>(
        Math.floor((initialRecipe?.preparationTime || 0) / 60)
    );
    const [preparationMinutes, setPreparationMinutes] = useState<number>(
        (initialRecipe?.preparationTime || 0) % 60
    );
    const [difficulty, setDifficulty] = useState<string>(
        initialRecipe?.difficulty || ""
    );
    const [category, setCategory] = useState<string>(
        initialRecipe?.mealType || ""
    );
    const [servings, setServings] = useState<number>(
        initialRecipe?.servings || 0
    );
    const [availableIngredients, setAvailableIngredients] = useState<
        { id: number; name: string; unit: string }[]
    >([]);

    const [ingredients, setIngredients] = useState<Ingredient[]>(
        (initialRecipe?.recipeIngredients as Ingredient[]) || [
            defaultIngredient,
        ]
    );

    console.log(initialRecipe);

    console.log(ingredients);
    const [description, setDescription] = useState<string>(
        initialRecipe?.description || ""
    );

    // const [image, setImage] = useState<ImageFile | null>(null);
    const [imageFileName, setImageFileName] = useState(
        initialRecipe?.fileName || ""
    );
    const [imageUrl, setImageUrl] = useState(initialRecipe?.imageUrl || "");

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${backendUrl}/ingredients/`);
                if (!response.ok) {
                    throw new Error("Error fetching ingredients");
                }
                const data = await response.json();
                const options = data.map((ingredient: any) => ({
                    id: ingredient.ingredientId,
                    name: ingredient.ingredientName,
                    unit: ingredient.unit,
                }));
                setAvailableIngredients(options);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchIngredients();
    }, []);

    const totalPreparationTime = preparationHours * 60 + preparationMinutes;
    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            {
                unit: "Grams",
                name: "",
                quantity: 0,

                ingredientId: ingredients.length,
            },
        ]);
    };

    const handleIngredientChange = (index: number, value: number) => {
        const selectedIngredient = availableIngredients.find(
            (ingredient) => ingredient.id === value
        );

        const newIngredients = [...ingredients];
        if (selectedIngredient) {
            newIngredients[index] = {
                ...newIngredients[index],
                name: selectedIngredient.name,
                ingredientId: selectedIngredient.id,
                unit: selectedIngredient.unit,
            };
        }
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
                setImageFileName(file.name);
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitIsDisabled = useMemo(
        () =>
            !recipeName ||
            !totalPreparationTime ||
            !difficulty ||
            !category ||
            !servings ||
            ingredients.some(
                (ingredient) => !ingredient.name || !ingredient.quantity
            ) ||
            !imageFileName ||
            !imageUrl,
        [
            recipeName,
            totalPreparationTime,
            difficulty,
            category,
            servings,
            ingredients,
            imageUrl,
            imageFileName,
        ]
    );

    const handleSaveRecipe = async () => {
        // const imageUrl = image ? await uploadImage(image.fileData) : '';   // de decomentat daca o sa putem trimite o imagine

        const recipeData: RecipeFields = {
            name: recipeName,
            description,
            difficulty,
            mealType: category,
            servings,
            imageUrl,
            fileName: imageFileName,
            ingredients,
            cookingTime: String(totalPreparationTime),
            recipeStatus: storedUserType() === UserType.CHEF ? "PRIVATE" : "PUBLIC",
        };

        try {
            const response = await fetch(
                `${backendUrl}/recipes?userId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(recipeData),
                }
            );

            if (!response.ok) {
                throw new Error("Error in submitting recipe");
            }

            // const data = await response.json();
            console.log("Recipe successfully added:");
            alert("Recipe successfully added.");
            navigate("/recipes/list");
        } catch (error) {
            console.error("Error:", error);
            // alert("An error occurred! The recipe has not been added.");
            // navigate("/recipes/list"); //TESTING
        }
    };

    const handleEditRecipe = async () => {
        const recipeData = {
            //de scos asta afara
            id: recipeId,
            name: recipeName,
            description,
            difficulty,
            mealType: category,
            servings,
            imageUrl,
            fileName: imageFileName,
            ingredients,
            cookingTime: String(totalPreparationTime),
            recipeStatus: initialRecipe.recipeStatus,
        };

        try {
            const response = await fetch(
                `${backendUrl}/recipes?userId=${userId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(recipeData),
                }
            );

            if (!response.ok) throw new Error("Error in updating recipe");

            alert("Recipe successfully updated.");
            navigate("/recipes/list");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! The recipe has not been updated.");
        }
    };
    useEffect(() => {
        // console.log(image);
        console.log(ingredients);
    }, [ingredients]);

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

                        <div>Preparation Time*</div>
                        <div className="preparation-time-container">
                            <SelectInput
                                value={preparationHours}
                                onChange={(e) =>
                                    setPreparationHours(Number(e.target.value))
                                }
                                options={preparationHoursValues}
                                placeholder="HH"
                            />

                            <SelectInput
                                value={preparationMinutes}
                                onChange={(e) =>
                                    setPreparationMinutes(
                                        Number(e.target.value)
                                    )
                                }
                                options={preparationMinutesValues}
                                placeholder="MM"
                            />
                        </div>

                        <div>Difficulty*</div>
                        <SelectInput
                            value={difficulty}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setDifficulty(e.target.value)
                            }
                            options={difficultyValues}
                            placeholder="Choose difficulty"
                        />

                        <div>Category*</div>

                        <SelectInput
                            className="recipe-name-input-box"
                            value={category}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setCategory(e.target.value)
                            }
                            options={categoryValues}
                            placeholder="Select category"
                        />

                        <div>Servings*</div>

                        <SelectInput
                            value={servings}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setServings(Number(e.target.value))
                            }
                            options={servingsValues}
                            placeholder="Select servings"
                        />

                        <div>Ingredient Name*</div>

                        {ingredients.map((ingredient, index) => (
                            <div
                                key={ingredient.ingredientId}
                                style={{ margin: "0 0 10px 0" }}
                            >
                                <SelectInput
                                    value={ingredient.ingredientId}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                    options={availableIngredients.map(
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
                            onClick={
                                isEditMode ? handleEditRecipe : handleSaveRecipe
                            }
                        >
                            {isEditMode ? "EDIT RECIPE" : "SAVE RECIPE"}
                        </button>
                    </div>

                    <div className="right-column">
                        <div>Recipe Image*</div>

                        {!imageUrl && !imageFileName && (
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
                        {imageUrl && imageFileName && (
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
                                    {imageFileName}
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={() => {
                                            setImageFileName("");
                                            setImageUrl("");
                                        }}
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
                            <div
                                key={ingredient.ingredientId}
                                style={{ margin: "0 0 10px 0" }}
                            >
                                <SelectInput
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientQuantityChange(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                    options={quantityOptions.map((option) => ({
                                        value: option.value,
                                        label: `${option.label} ${ingredient.unit}`,
                                    }))}
                                    placeholder="Select ingredient quantity"
                                    className="recipe-name-input-box"
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
