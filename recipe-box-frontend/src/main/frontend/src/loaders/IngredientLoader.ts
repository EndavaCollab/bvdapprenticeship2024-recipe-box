import { json, LoaderFunctionArgs } from 'react-router-dom';

export async function ingredientsLoader({ params }: LoaderFunctionArgs) {
    try {
        const storedUserId = sessionStorage.getItem("userId");

        const baseUrl = process.env.REACT_APP_BACKEND_URL;

        if (!baseUrl) {
            throw new Error('Base URL is not defined');
        }

        if (!storedUserId) {
            throw new Error('User ID is not available');
        }

        const url = `${baseUrl}/ingredients/user?userId=${parseInt(storedUserId, 10)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch ingredients.');
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error loading ingredients:', error);
        return json({ error: (error as Error).message }, { status: 500 });
    }
}
