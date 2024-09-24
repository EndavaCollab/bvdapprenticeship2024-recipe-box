import React, { useState } from "react";
import './IngredientListPage.css';
import SearchBar from "../../components/IngredientList/SearchBar";
import IngredientList from "../../components/IngredientList/IngredientList";
import Pagination from "../../components/IngredientList/Pagination";

interface Ingredient {
    id: number;
    name: string;
    category: string;
    unit: string;
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
    quantity: number;
}

const ingredientsData: Ingredient[] = [
    { id: 1, name: 'Ingredient 1', category: 'Grain', unit: 'g', kcal: 100, carbs: 100, fat: 100, protein: 100, quantity: 100 },
    { id: 2, name: 'Ingredient 2', category: 'Nuts', unit: 'ml', kcal: 30, carbs: 30, fat: 30, protein: 30, quantity: 30 },
    { id: 3, name: 'Ingredient 3', category: 'Grain', unit: 'g', kcal: 30, carbs: 21, fat: 31, protein: 22, quantity: 0 },
    { id: 4, name: 'Ingredient 1', category: 'Grain', unit: 'g', kcal: 100, carbs: 100, fat: 100, protein: 100, quantity: 100 },
    { id: 5, name: 'Ingredient 2', category: 'Nuts', unit: 'ml', kcal: 30, carbs: 30, fat: 30, protein: 30, quantity: 30 },
    { id: 6, name: 'Ingredient 3', category: 'Grain', unit: 'g', kcal: 30, carbs: 21, fat: 31, protein: 22, quantity: 0 },
    { id: 7, name: 'Ingredient 1', category: 'Grain', unit: 'g', kcal: 100, carbs: 100, fat: 100, protein: 100, quantity: 100 },
    { id: 8, name: 'Ingredient 2', category: 'Nuts', unit: 'ml', kcal: 30, carbs: 30, fat: 30, protein: 30, quantity: 30 },
    { id: 9, name: 'Ingredient 3', category: 'Grain', unit: 'g', kcal: 30, carbs: 21, fat: 31, protein: 22, quantity: 0 },
    { id: 10, name: 'Ingredient 1', category: 'Grain', unit: 'g', kcal: 100, carbs: 100, fat: 100, protein: 100, quantity: 100 },
    { id: 11, name: 'Ingredient 2', category: 'Nuts', unit: 'ml', kcal: 30, carbs: 30, fat: 30, protein: 30, quantity: 30 },
    { id: 12, name: 'Ingredient 3', category: 'Grain', unit: 'g', kcal: 30, carbs: 21, fat: 31, protein: 22, quantity: 0 },
];

const IngredientListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

    return (
        <div className="ingredient-list-page">
            <h1>Ingredient List</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <IngredientList
                ingredients={ingredientsData}
                searchTerm={searchTerm}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={ingredientsData.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default IngredientListPage;
