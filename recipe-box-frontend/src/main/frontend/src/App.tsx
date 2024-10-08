import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import RecipesList from "./components/RecipesList/RecipesList";
import LayoutWithHeaderMainFooter from "./layouts/LayoutWithHeaderMainFooter";
import RecipeViewPage from "./Pages/RecipeViewPage/RecipeViewPage";
import { recipeLoader } from "./loaders/RecipeLoader";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import UserLogin from "./Pages/LoginPage/UserLogin";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import IngredientListPage from "./Pages/IngredientListPage/IngredientListPage";
import {ingredientsLoader} from "./loaders/IngredientLoader";

export const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="recipes" element={<LayoutWithHeaderMainFooter />}>
                    <Route index path="list" element={<RecipesList />} />
                    <Route
                        path="view/:recipeId"
                        element={<RecipeViewPage />}
                        loader={recipeLoader}
                    />
                    <Route path="addrecipe" element={<RecipeForm />} />

                    <Route
                        index
                        path="myRecipes"
                        element={<RecipesList privateRecipes={true} />}
                    />

                    <Route
                        path="editRecipe/:recipeId"
                        element={<RecipeForm isEditMode={true} />}
                        loader={recipeLoader}
                    />
                </Route>
                <Route path="ingredients" element={<LayoutWithHeaderMainFooter />}>
                    <Route
                        path="list"
                        element={<IngredientListPage />}
                        loader={ingredientsLoader}
                    />
                </Route>

                <Route path="/userlogin" element={<UserLogin />} />
            </>
        )
    );

    return router;
}

export default App;
