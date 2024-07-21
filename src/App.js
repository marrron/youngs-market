import React from "react";
import Login from "./pages/Login";
import GlobalStyles from "./style/GlobalStyles";
import LoginBox from "./components/LoginBox";

function App() {
	return (
		<>
			<GlobalStyles />
			<Login>
				<LoginBox />
			</Login>
		</>
	);
}
export default App;
