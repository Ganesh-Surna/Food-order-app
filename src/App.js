import React, { Fragment,useState } from "react";

import Header from "./Components/HeaderLayout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./context-store/CartContextProvider";

function App() { 

  const [isCartShown,setIsCartShown]=useState(false);

  const handleShowCart=()=>{
    setIsCartShown(true);
  };

  const handleHideCart=()=>{
    setIsCartShown(false);
  };

  return (
    <CartContextProvider>
      {isCartShown && <Cart onHideCart={handleHideCart} />}
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals/>
      </main>
    </CartContextProvider>
  );
}

export default App;
