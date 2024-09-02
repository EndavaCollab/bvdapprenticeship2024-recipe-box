import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import RecipesList from "./Pages/RecipesList/RecipesList";
import UserLogin from "./Pages/UserLogin/UserLogin";

export const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipeslist" element={<RecipesList />} />
                <Route path="/userlogin" element={<UserLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
