import React from "react";
import Router from "./routes/Router";
import GlobalStyles from "./style/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <GlobalStyles />
        <Router />
      </ProductProvider>
    </AuthProvider>
  );
}
export default App;
