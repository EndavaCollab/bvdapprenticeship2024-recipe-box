import React, { useState, useEffect } from "react";
import IngredientItem from "./IngredientListItem";
import "./IngredientList.css";

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

interface IngredientListProps {
    ingredients: Ingredient[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, searchTerm, currentPage, itemsPerPage }) => {
    const [sortedIngredients, setSortedIngredients] = useState<Ingredient[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Ingredient | null; direction: 'ascending' | 'descending' | null }>({
        key: null,
        direction: null,
    });

    useEffect(() => {
        setSortedIngredients(ingredients);
    }, [ingredients]);

    const sortData = (key: keyof Ingredient) => {
        let direction: 'ascending' | 'descending' = 'ascending';

        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sorted = [...sortedIngredients].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedIngredients(sorted);
        setSortConfig({ key, direction });
    };

    const renderSortIndicator = (key: keyof Ingredient) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '↕';
    };

    const normalizeString = (str: string) => {
        return str.replace(/\s+/g, '').toLowerCase();
    };

    const filteredIngredients = sortedIngredients.filter(ingredient =>
        normalizeString(ingredient.name).includes(normalizeString(searchTerm))
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentIngredients = filteredIngredients.slice(startIndex, startIndex + itemsPerPage);

    return (
        <table className="ingredient-table">
            <thead>
            <tr>
                <th></th>
                <th onClick={() => sortData('name')}>Ingredient {renderSortIndicator('name')}</th>
                <th onClick={() => sortData('category')}>Category {renderSortIndicator('category')}</th>
                <th>Unit</th>
                <th>Kcal</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Protein</th>
                <th onClick={() => sortData('quantity')}>Quantity {renderSortIndicator('quantity')}</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentIngredients.map((ingredient: Ingredient) => (
                <IngredientItem key={ingredient.id} ingredient={ingredient} />
            ))}
            </tbody>
        </table>
    );
}

export default IngredientList;
