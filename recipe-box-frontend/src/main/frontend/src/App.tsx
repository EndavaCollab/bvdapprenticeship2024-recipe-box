import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipesList from "./components/RecipesList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipeslist" element={<RecipesList />} />
            </Routes>
        </Router>
    );
}

export default App;
