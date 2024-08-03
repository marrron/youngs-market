import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsIntersection, setCartItemsIntersection] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    if (cartItemsIntersection.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItemsIntersection));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItemsIntersection]);

  return (
    <CartContext.Provider
      value={{ cartItemsIntersection, setCartItemsIntersection }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartItems = () => {
  return useContext(CartContext);
};
