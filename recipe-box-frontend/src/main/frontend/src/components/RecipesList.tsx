// src/components/RecipesList.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './RecipesList.css';

function RecipesList() {
    return (
        <div className="recipes-list">
            <Header />
            <main>
                {/* Aici poți adăuga conținutul specific paginii */}
            </main>
            <Footer />
        </div>
    );
}

export default RecipesList;
