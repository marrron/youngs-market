import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const savedProduct = localStorage.getItem("selectedProduct");
    return savedProduct ? JSON.parse(savedProduct) : [];
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
