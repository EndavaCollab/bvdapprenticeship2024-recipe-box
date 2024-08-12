import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import {ReactComponent as Logo} from '../assets/images/recipe_box_logo_light.svg'

function HomePage() {
  const navigate = useNavigate(); 

  const navigateToRecipesList = () => {
    navigate('/recipeslist'); 
  };


  return ( 
    <div className="home-page">
      <Logo className="logo"></Logo>
      <h2>
      Recipe Box is an intuitive app for organizing, discovering,
      and sharing recipes. It helps food enthusiasts keep track of their
      favorite dishes and explore new ones in a streamlined,
      user-friendly interface.
      </h2>
      <button className="start-button" onClick={navigateToRecipesList}><h3>START COOKING</h3></button>

    </div>
  )
}

export default HomePage;