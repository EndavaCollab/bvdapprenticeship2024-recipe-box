import React, { useState } from "react";
import "./Categories.css";

export default function Categories({
    onChangeMealType,
    onChangeSearchQuery,
}: {
    onChangeMealType: (newMealType: string) => void;
    onChangeSearchQuery: (newSearchQuery: string) => void;
}) {
    const [selectedMealType, setSelectedMealType] = useState<string>("");
    const handleMealTypeChange = (mealType: string) => {
        setSelectedMealType(mealType);
        onChangeMealType(mealType);
    };

    const categories = [
        "ALL recipes",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack",
    ];

    return (
        <div className="button-container">
            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedMealType ===
                            (category === "ALL recipes" ? "" : category)
                                ? "active button"
                                : "button"
                        }
                        onClick={() =>
                            handleMealTypeChange(
                                category === "ALL recipes" ? "" : category
                            )
                        }
                    >
                        <span className="button__text">{category}</span>
                        <span className="carpator_si_cutit"></span>
                        <span className="ceasca"></span>
                        <span className="oala_deschisa"></span>
                        <span className="sare"></span>
                    </button>
                ))}

                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => onChangeSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
}
