import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemsIntersection, setCartItemsIntersection] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItemsIntersection");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    if (cartItemsIntersection.length > 0) {
      localStorage.setItem(
        "cartItemsIntersection",
        JSON.stringify(cartItemsIntersection)
      );
    } else {
      localStorage.removeItem("cartItemsIntersection");
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
