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
import IngredientListPage from "./Pages/IngredientListPage/IngredientListPage";

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
                </Route>
                <Route path="ingredients" element={<LayoutWithHeaderMainFooter />}>
                    <Route
                        path="list"
                        element={<IngredientListPage />}
                    />
                </Route>
                <Route path="/userlogin" element={<UserLogin />} />
            </>
        )
    );

    return router;
}

export default App;
