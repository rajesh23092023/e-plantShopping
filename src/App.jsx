// App.jsx (CORRECTED)

import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import './index.css'; // Assuming this is your combined CSS file
import AboutUs from './AboutUs.jsx';

function App() {
  
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    // When "Get Started" is clicked, show the Product List view
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    // This handler is passed down to ProductList/Navbar to return to the home screen
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {/* CONDITIONAL RENDERING: 
        If showProductList is FALSE, display the Landing Page (Home View).
        If showProductList is TRUE, display the Product List/Store View.
      */}
      {!showProductList ? (
        // --- LANDING PAGE VIEW (Home) ---
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
                <h1>Welcome To Paradise Nursery</h1>
                <div className="divider"></div>
                <p>Where Green Meets Serenity</p>
            
                {/* BUTTON: Triggers the state change to show ProductList */}
                <button className="get-started-button" onClick={handleGetStartedClick}>
                    Get Started
                </button>
            </div>
            
            {/* RIGHT SIDE: AboutUs Component, wrapped in the container with the white background */}
            <div className="aboutus_container">
              <AboutUs/>
            </div>
          </div>
        </div>
      ) : (
        // --- PRODUCT LIST / STORE VIEW ---
        <div className="product-list-view">
          {/* ProductList component renders the store and the store's Navbar */}
          <ProductList onHomeClick={handleHomeClick} />
        </div>
      )}
    </div>
  );
}

export default App;