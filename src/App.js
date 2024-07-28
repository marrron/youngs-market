import React from "react";
import Login from "./pages/Login";
import GlobalStyles from "./style/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import ProductList from "./pages/ProductLists";

function App() {
	return (
		<AuthProvider>
			<GlobalStyles />
			<Login></Login>
		</AuthProvider>
	);
}
export default App;
