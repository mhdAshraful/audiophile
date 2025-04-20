import { Route, Routes } from "react-router";
import Product from "./Components/Pages/Product";
import ProductDetails from "./Components/Pages/ProductDetails";
import NavBar from "./Components/Utils/NavBar";

import { memo, useEffect, useState } from "react";
import Home from "./Components/Pages/Home";
import { AppData } from "./Components/Contexts/DataContext";
import ScrollToTop from "./Components/Utils/ScrollToTop";
import Cart from "./Components/Utils/Cart";
import Checkout from "./Components/Pages/Checkout";

function App() {
	let { state, loading } = AppData();
	let [showcart, setShowcart] = useState(false);

	let [width, setWidth] = useState(window.innerWidth);

	const resized = () => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	};

	useEffect(() => {
		resized();
	}, [width]);

	return loading === true ? (
		<Load />
	) : (
		<div>
			<ScrollToTop />
			<NavBar width={width} setShowcart={setShowcart} />
			<div className="App">
				{showcart && state.cart.length !== 0 ? (
					<Cart setShowcart={setShowcart} />
				) : (
					<></>
				)}

				<Routes>
					<Route path="/" index element={<Home />} />
					<Route path="headphones" element={<Product />} />
					<Route path="headphones/:slug" element={<ProductDetails />} />
					<Route path="earphones" element={<Product />} />
					<Route path="earphones/:slug" element={<ProductDetails />} />
					<Route path="speakers" element={<Product />} />
					<Route path="speakers/:slug" element={<ProductDetails />} />
					{/* Child component is outlate  */}
					{/* Outlate imports child comp inside parent if child route is inside <Route></Route>*/}
					<Route path="checkout" element={<Checkout />} />
				</Routes>
			</div>
		</div>
	);
}

function Load() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return prev;
				}
				return prev + 1;
			});
		}, Math.random(500));

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				top: "0",
				left: "0",
				background: "#080808",
			}}
		>
			<h1
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					padding: "1rem 2rem",
					borderRadius: "12px",
					color: "#fff",
					transition: "all 1s ease-in",
				}}
			>
				{count}%
			</h1>
		</div>
	);
}

export default memo(App);
