import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Styles/Global.scss";
import { ContextWrapper } from "./Components/Contexts/DataContext.jsx";
import { OrderContextWrapper } from "./Components/Contexts/OrderContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ContextWrapper>
			<BrowserRouter>
				<OrderContextWrapper>
					<App />
				</OrderContextWrapper>
			</BrowserRouter>
		</ContextWrapper>
	</StrictMode>
);
