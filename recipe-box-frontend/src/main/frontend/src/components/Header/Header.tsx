import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/recipe_box_logo_light.svg';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="left-items">
                        <li className="logo">
                            <Logo className="logo-image" />
                        </li>
                        <li >
                            <button 
                                className="nav-item" 
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                Recipes &#x25BE;
                            </button>
                            {isOpen && (
                                <ul className="dropdown-menu">
                                    <li style={{textAlign:"left"}} ><Link to="/recipes/list" className="dropdown-item">Public Recipes</Link></li>
                                    <li><Link to="/recipes/my-list" className="dropdown-item">My Recipes</Link></li>
                                    <li><Link to="/recipes/ingredients" className="dropdown-item">Recipes with My Ingredients</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link to="/ingredients" className="nav-item">Ingredients</Link></li>
                        <li><Link to="/meal-plans" className="nav-item">Meal Plans</Link></li>
                    </div>
                    <div className="right-items">
                        <li className="right">
                            <Link to="/userlogin" className="button">LOGIN</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
