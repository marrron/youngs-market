import React from "react";
import Router from "./routes/Router";
import GlobalStyles from "./style/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <GlobalStyles />
          <Router />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
export default App;
