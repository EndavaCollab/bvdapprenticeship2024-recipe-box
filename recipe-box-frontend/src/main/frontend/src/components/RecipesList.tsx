import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './RecipesList.css';

const RecipesList: React.FC = () => {
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
