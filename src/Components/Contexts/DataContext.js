import axios from "axios";
import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";

const AppContext = createContext();
export const AppData = () => useContext(AppContext);

export const ContextWrapper = ({ children }) => {
	// console.log("Entered into context");

	let [loading, setLoading] = useState(true);

	let initialState = {
		data: [],
		earphones: [],
		headphones: [],
		speakers: [],
		cart: JSON.parse(localStorage.getItem("cart")) || [],
		total_quantity: 0,
		grand_total: 0,
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "SETDATA": {
				return { ...state, data: action.payload };
			}
			case "FIND_CATEGORY": {
				let headphones = action.payload.filter(
					(item) => item.category === "headphones"
				);
				// console.log("reduced to headphones:", headphones);
				let earphones = action.payload.filter(
					(item) => item.category === "earphones"
				);
				// console.log("reduced to earphones:", earphones);
				let speakers = action.payload.filter(
					(item) => item.category === "speakers"
				);
				// console.log("reduced to speakers:", speakers);

				return { ...state, headphones, earphones, speakers };
			}
			case "ADD_TO_CART": {
				let { item, quantity } = action.payload;

				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);

				if (existing) {
					const newitem = state.cart.map((cartObj) =>
						cartObj.item.slug === item.slug
							? { ...existing, quantity: existing.quantity + quantity }
							: cartObj
					);

					let cart = newitem;
					localStorage.setItem("cart", JSON.stringify(cart));
					return { ...state, cart };
				} else {
					let cart = [...state.cart, { item, quantity }];

					localStorage.setItem("cart", JSON.stringify(cart));
					return { ...state, cart };
				}
			}
			case "CART_INC": {
				let item = action.payload;
				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);

				const newitem = state.cart.map((cartObj) =>
					cartObj.item.slug === item.slug
						? { ...existing, quantity: existing.quantity + 1 }
						: cartObj
				);

				let cart = newitem;
				localStorage.setItem("cart", JSON.stringify(cart));
				return { ...state, cart };
			}
			case "CART_DEC": {
				let item = action.payload;
				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);

				if (existing.quantity === 1) {
					let cart = state.cart.filter(
						(iot) => iot.item.slug !== existing.item.slug
					);

					localStorage.setItem("cart", JSON.stringify(cart));
					return { ...state, cart };
				} else {
					const newitem = state.cart.map((cartObj) =>
						cartObj.item.slug === item.slug
							? { ...existing, quantity: existing.quantity - 1 }
							: cartObj
					);

					let cart = newitem;
					localStorage.setItem("cart", JSON.stringify(cart));
					return { ...state, cart };
				}
			}
			case "CART_REMOVE": {
				let item = action.payload;

				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);

				if (existing) {
					const newitem = state.cart.filter(
						(iot) => iot.item.slug !== existing.item.slug
					);

					let cart = newitem;
					localStorage.setItem("cart", JSON.stringify(cart));
					return { ...state, cart };
				} else {
					throw new Error("can not perfom this action:", action.type);
				}
			}
			case "CART_CLEAR":
				let { cart } = state;
				cart = [];
				localStorage.removeItem("cart");
				return { ...state, cart };

			case "GRAND_TOTAL": {
				// console.log("length", state.cart.length);
				let { cart, grand_total } = state;
				grand_total = cart.reduce(
					(a, i) => a + i.item.price * i.quantity,
					0
				);

				return { ...state, grand_total };
			}

			default:
				throw new Error(`${action.type} is not allowed!!`);
		}
	};

	/* 
      ┌─────────────────────────────────────────────────────────────────────────┐
      │     function declarations for                                           │
      ├─────────────────────────────────────────────────────────────────────────┤
      │     dispatchers                                                         │
      └─────────────────────────────────────────────────────────────────────────┘
     */

	const addtocart = (item, quantity) => {
		dispatch({
			type: "ADD_TO_CART",
			payload: { item: item, quantity: quantity },
		});
	};
	const remove = (item) => {
		dispatch({ type: "CART_REMOVE", payload: item });
	};
	const increase = (item) => {
		dispatch({ type: "CART_INC", payload: item });
	};
	const decrease = (item) => {
		dispatch({ type: "CART_DEC", payload: item });
	};
	const clearcart = () => {
		dispatch({ type: "CART_CLEAR" });
	};

	// const url = "http://localhost:5555/api/allproducts";
	// const url = "http://10.0.0.6:5555/api/allproducts";
	const url = "https://audio-server-amber.vercel.app/api/allproducts";

	useEffect(() => {
		const getData = async () => {
			// console.log("data called from DB");
			setLoading(true);
			await axios
				.get(url)
				.then((response) => {
					if (response.status === 200) {
						// console.log("response from DB", response.data);
						dispatch({ type: "SETDATA", payload: response.data });
						dispatch({ type: "FIND_CATEGORY", payload: response.data });
					}
					setLoading(false);
				})
				.catch((e) => {
					console.log("axiosError::", e);
				});
		};
		getData();
	}, []);

	/* 
      ┌────────────────────────────────────────────────────────────────────────────┐
      │     Inside lical storage we will store server response.                    │
      ├────────────────────────────────────────────────────────────────────────────┤
      │     use dispatcher to re calculate as new value                            │
      │                                                                            │
      └────────────────────────────────────────────────────────────────────────────┘
     */
	let [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider
			value={{
				state,
				loading,
				addtocart,
				increase,
				decrease,
				remove,
				clearcart,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
