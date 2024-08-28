import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderkind, setOrderkind] = useState(() => {
    const savedOrder = localStorage.getItem("orderkind");
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  useEffect(() => {
    if (orderkind) {
      localStorage.setItem("orderkind", JSON.stringify(orderkind));
    } else {
      localStorage.removeItem("orderkind");
    }
  }, [orderkind]);

  return (
    <OrderContext.Provider value={{ orderkind, setOrderkind }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
