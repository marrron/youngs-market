import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderkind, setOrderkind] = useState(() => {
    const savedOrder = localStorage.getItem("orderkind");
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  const [filteredItems, setFilteredItems] = useState(() => {
    const filteredOrder = localStorage.getItem("filteredItems");
    return filteredOrder ? JSON.parse(filteredOrder) : [];
  });

  useEffect(() => {
    if (orderkind) {
      localStorage.setItem("orderkind", JSON.stringify(orderkind));
    } else {
      localStorage.removeItem("orderkind");
    }
  }, [orderkind]);

  useEffect(() => {
    if (filteredItems) {
      localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
    } else {
      localStorage.removeItem("filteredItems");
    }
  }, [filteredItems]);

  return (
    <OrderContext.Provider
      value={{ orderkind, setOrderkind, filteredItems, setFilteredItems }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
