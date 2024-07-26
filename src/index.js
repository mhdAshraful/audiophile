import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/Global.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ContextWrapper } from "./Components/Contexts/DataContext";
import { OrderContextWrapper } from "./Components/Contexts/OrderContext";

// console.log("index called");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ContextWrapper>
			<BrowserRouter>
				<OrderContextWrapper>
					<App />
				</OrderContextWrapper>
			</BrowserRouter>
		</ContextWrapper>
	</React.StrictMode>
);

reportWebVitals();
