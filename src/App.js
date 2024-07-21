import React from "react";
import Login from "./pages/Login";
import GlobalStyles from "./style/GlobalStyles";
import AccountBox from "./components/AccountBox";

function App() {
	return (
		<>
			<GlobalStyles />
			<Login>
				<AccountBox />
			</Login>
		</>
	);
}
export default App;
