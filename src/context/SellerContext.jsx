import React, { createContext, useContext, useState, useEffect } from "react";

const SellerContext = createContext();

export const SellerPovider = ({ children }) => {
  const [editingProduct, setEditingProduct] = useState(() => {
    const savedProduct = localStorage.getItem("editingProduct");
    return savedProduct ? JSON.parse(savedProduct) : null;
  });

  const [isEditing, setIsEditing] = useState(() => {
    const editingProduct = localStorage.getItem("isEditing");
    return editingProduct ? JSON.parse(editingProduct) : false;
  });

  useEffect(() => {
    if (editingProduct) {
      localStorage.setItem("editingProduct", JSON.stringify(editingProduct));
    } else {
      localStorage.removeItem("editingProduct");
    }
  }, [editingProduct]);

  useEffect(() => {
    if (isEditing) {
      localStorage.setItem("isEditing", JSON.stringify(isEditing));
    } else {
      localStorage.removeItem("isEditing");
    }
  }, [isEditing]);

  return (
    <SellerContext.Provider
      value={{ editingProduct, setEditingProduct, isEditing, setIsEditing }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  return useContext(SellerContext);
};
