import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Styles/Global.scss";
import { ContextWrapper } from "./Components/Contexts/DataContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ContextWrapper>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ContextWrapper>
	</StrictMode>
);
