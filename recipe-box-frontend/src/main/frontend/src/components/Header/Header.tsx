import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/recipe_box_logo_light.svg';
import { UserType } from '../../enums/User';

interface HeaderProps {
    userType?: UserType;
}

const Header: React.FC = ({
    userType = UserType.CHEF,
}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="header">
            <nav>
                <ul>
                    <div className="left-items">
                        <li className="logo">
                            <Logo className="logo-image" />
                        </li>
                        {userType !== UserType.GUEST && (
                            <>
                                <li >
                                {userType === UserType.CHEF && (
                                    <>
                                        <button 
                                        className="nav-item" 
                                        onClick={() => setIsOpen(!isOpen)}
                                        >
                                        Recipes &#x25BE;
                                        </button>
                                        {isOpen && (
                                        <ul className="dropdown-menu" onClick={() => setIsOpen(!isOpen)}>
                                            <li><Link to="/recipes/list" className="dropdown-item">Public Recipes</Link></li>
                                            <li><Link to="/recipes/myRecipes" className="dropdown-item">My Recipes</Link></li>
                                            <li><Link to="/recipes/ingredients" className="dropdown-item">Recipes with My Ingredients</Link></li>
                                        </ul>
                                        )}
                                    </>
                                )}

                                {userType === UserType.ADMIN && (
                                    <Link to="/recipes/list" className='nav-item'>Recipes</Link>
                                )}
                                </li>
                                <li><Link to="/ingredients" className="nav-item">Ingredients</Link></li>
                                
                                {userType === UserType.CHEF && (
                                    <li><Link to="/meal-plans" className="nav-item">Meal Plans</Link></li>
                                )}
                            </>
                        )}
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
