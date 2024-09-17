import { json, LoaderFunctionArgs } from 'react-router-dom';

export async function recipeLoader({ params }: LoaderFunctionArgs) {
    try {
        const recipeId = params.recipeId;
        const userId = 1;
        const baseUrl = process.env.REACT_APP_BACKEND_URL;

        if (!baseUrl) {
            throw new Error('Base URL is not defined');
        }

        const url = `${baseUrl}/recipes/${recipeId}?userId=${userId}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch the recipe.');
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error loading recipe:', error);
        return json({ error: (error as Error).message }, { status: 500 });
    }
}
