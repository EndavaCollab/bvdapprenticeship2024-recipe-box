import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import "./RecipesGrid.css";
import { backendUrl } from "../../App";

interface Recipe {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    mealType: string;
}

interface RecipesGridProps {
    mealType?: string;
    searchQuery?: string;
}
export default function RecipesGrid({
    mealType = "",
    searchQuery = "",
}: RecipesGridProps) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        let url = `${backendUrl}${mealType ? `?mealType=${mealType}` : ""}`;

        fetch(
            searchQuery ? `${backendUrl}search?recipeName=${searchQuery}` : url,
            {
                signal,
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Bad response: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Recipe[]) => {
                if (!signal.aborted) {
                    setRecipes(data);
                }
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Fetch error:", error);
                }
            });

        return () => {
            controller.abort();
        };
    }, [mealType, searchQuery]);

    const recipesToDisplay = recipes.length > 0 ? recipes : testRecipes;

    const filteredRecipes = recipesToDisplay
        .filter((recipe) => mealType === "" || recipe.mealType === mealType)
        .filter((recipe) =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    title={recipe.name}
                    description={recipe.description}
                    imageUrl={recipe.imageUrl}
                />
            ))}
        </div>
    );
}

const testRecipes: Recipe[] = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        description:
            "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Dinner",
    },
    {
        id: 2,
        name: "Chicken Curry",
        description:
            "A spicy and flavorful dish made with chicken, spices, and coconut milk.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Dinner",
    },
    {
        id: 3,
        name: "Beef Tacos",
        description:
            "Mexican-style tacos with seasoned beef, fresh vegetables, and salsa.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Lunch",
    },
    {
        id: 4,
        name: "Vegetable Stir Fry",
        description:
            "A healthy and quick stir fry with fresh vegetables and a savory sauce.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Lunch",
    },
    {
        id: 5,
        name: "Pancakes",
        description:
            "Fluffy pancakes served with syrup and butter, perfect for breakfast.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Breakfast",
    },
    {
        id: 6,
        name: "Caesar Salad",
        description:
            "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Lunch",
    },
    {
        id: 7,
        name: "Chocolate Cake",
        description:
            "A rich and moist chocolate cake topped with creamy chocolate frosting.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Dessert",
    },
    {
        id: 8,
        name: "Fruit Smoothie",
        description:
            "A refreshing smoothie made with a blend of fresh fruits and yogurt.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Snack",
    },
    {
        id: 9,
        name: "Grilled Cheese Sandwich",
        description:
            "A classic sandwich with melted cheese between two slices of grilled bread.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Lunch",
    },
    {
        id: 10,
        name: "Apple Pie",
        description:
            "A traditional dessert with a flaky crust and a spiced apple filling.",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
        mealType: "Dessert",
    },
];
