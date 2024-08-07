import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate(); 

  const navigateToRecipesList = () => {
    navigate('/recipeslist'); 
  };


  return ( 
    <div className="home-page">
      <h1>
        Recipe BOX
      </h1>
      <h3>
      Recipe Box is an intuitive app for organizing, discovering,
      and sharing recipes. It helps food enthusiasts keep track of their
      favorite dishes and explore new ones in a streamlined,
      user-friendly interface.
      </h3>
      <button className="cta-button" onClick={navigateToRecipesList}><strong>START COOKING</strong></button>

    </div>
  )
}

export default HomePage;