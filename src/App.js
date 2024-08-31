import React from "react";
import Router from "./routes/Router";
import GlobalStyles from "./style/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { SellerPovider } from "./context/SellerContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <SellerPovider>
              <GlobalStyles />
              <Router />
            </SellerPovider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
export default App;
