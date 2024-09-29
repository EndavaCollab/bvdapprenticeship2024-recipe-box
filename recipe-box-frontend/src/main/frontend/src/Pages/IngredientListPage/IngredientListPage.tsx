import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./IngredientListPage.css";
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

const IngredientListPage: React.FC = () => {
    const ingredientsData = useLoaderData() as Ingredient[];
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
};

export default IngredientListPage;
