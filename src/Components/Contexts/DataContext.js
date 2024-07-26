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
	console.log("Entered into context");

	let [loading, setLoading] = useState(true);

	let initialState = {
		data: [],
		earphones: [],
		headphones: [],
		speakers: [],
		loading: false,
		cart: [],
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
				console.log("reduced to headphones:", headphones);
				let earphones = action.payload.filter(
					(item) => item.category === "earphones"
				);
				console.log("reduced to earphones:", earphones);
				let speakers = action.payload.filter(
					(item) => item.category === "speakers"
				);
				console.log("reduced to speakers:", speakers);

				return { ...state, headphones, earphones, speakers };
			}
			case "ADD_TO_CART": {
				console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
				console.log("cart preview", state.cart);
				console.log("recieved item", action.payload.item);
				console.log("recieved quantity", action.payload.quantity);
				let { item, quantity } = action.payload;

				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);
				console.log("exiting----------------", existing);
				if (existing) {
					const newitem = state.cart.map((cartObj) =>
						cartObj.item.slug === item.slug
							? { ...existing, quantity: existing.quantity + quantity }
							: cartObj
					);
					console.log("toatly new --- cart --- is:--->", newitem);
					let cart = newitem;
					return { ...state, cart };
				} else {
					let cart = [...state.cart, { item, quantity }];
					console.log("let cart after setting==================", cart);
					return { ...state, cart };
				}
			}
			case "CART_INC": {
				console.log(
					"----------------------------Increament func------------------------------"
				);
				console.log("cart preview", state.cart);
				console.log("add req for item", action.payload);
				let item = action.payload;
				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);
				console.log(
					"exiting retutn an object after find()----------------",
					existing
				);
				const newitem = state.cart.map((cartObj) =>
					cartObj.item.slug === item.slug
						? { ...existing, quantity: existing.quantity + 1 }
						: cartObj
				);
				console.log("toatly new --- cart --- is:--->", newitem);
				let cart = newitem;
				return { ...state, cart };
			}
			case "CART_DEC": {
				console.log(
					"----------------------------DECREASE------------------------------"
				);
				console.log("cart preview", state.cart);
				console.log("remove req for item", action.payload);
				let item = action.payload;
				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);
				console.log(
					"exiting retutn an object after find()----------------",
					existing
				);
				if (existing.quantity === 1) {
					let cart = state.cart.filter(
						(iot) => iot.item.slug !== existing.item.slug
					);
					console.log("let cart after setting==================", cart);
					return { ...state, cart };
				} else {
					const newitem = state.cart.map((cartObj) =>
						cartObj.item.slug === item.slug
							? { ...existing, quantity: existing.quantity - 1 }
							: cartObj
					);
					console.log("toatly new --- cart --- is:--->", newitem);
					let cart = newitem;
					return { ...state, cart };
				}
			}
			case "CART_REMOVE": {
				console.log(
					"----------------------------Remove------------------------------"
				);
				console.log("cart preview", state.cart);
				console.log("remove req for item", action.payload);
				let item = action.payload;

				const existing = state.cart.find(
					(obj) => obj.item.slug === item.slug
				);
				console.log("exiting----------------", existing);
				if (existing) {
					const newitem = state.cart.filter(
						(iot) => iot.item.slug !== existing.item.slug
					);
					console.log(
						"filtered------========-------->>>>>>> item",
						newitem
					);
					let cart = newitem;
					return { ...state, cart };
				} else {
					throw new Error("can not perfom this action:", action.type);
				}
			}
			case "CART_CLEAR":
				let { cart } = state;
				cart = [];
				return { ...state, cart };

			case "GRAND_TOTAL": {
				// console.log("length", state.cart.length);
				let { cart, grand_total } = state;
				grand_total = cart.reduce(
					(a, i) => a + i.item.price * i.quantity,
					0
				);
				console.log("item price", grand_total);
				return { ...state, grand_total };
			}
			// let { grand_total, quantity } = state.cart.reduce((accum,
			//     item) => {
			//     // Get the quantity of the current item
			//     let quantity = state.cart.filter((obj) => obj.slug === item.slug).length;

			//     // must be to pure function
			//     // Multiply the price of the current item by its quantity    and add it to the   accumulator
			//     function calcAccum(price, quantity) {
			//         let item_total = price * quantity;
			//         return {
			//             grand_total: item_total,
			//             quantity: quantity
			//         }
			//     }
			//     let res = calcAccum(item.price, quantity);
			//     accum = res
			//     return accum;
			// }, { grand_total: 0, quantity: 0 });

			// return { ...state, grand_total, quantity };

			case "LOADING": {
				let loading = action.payload;
				console.log("loading", loading);
				return { ...state, loading: loading };
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

	/*
      ┌─────────────────────────────────────────────────────────────────────────────┐
      │             const getData = async () => {                                   │
      │             let response = await fetch(url);                                │
      │             let data = await response.json();                               │
      │             setAllData(data);                                               │
      │                                                                             │
      │             let earphone = await data.filter((item) => item.category ==     │
      │ "earphones")                                                                │
      │             let headphone = await data.filter((item) => item.category ==    │
      │ "headphones")                                                               │
      │             let speaker = await data.filter((item) => item.category ==      │
      │ "speakers")                                                                 │
      │             setloading(false);                                              │
      │         }                                                                   │
      └─────────────────────────────────────────────────────────────────────────────┘
     */
	const getData = () => {
		console.log("data called from DB");
		dispatch({ type: "LOADING", payload: true });
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				console.log("allData:::", response.data);

				dispatch({ type: "SETDATA", payload: response.data });
				dispatch({ type: "FIND_CATEGORY", payload: response.data });
				if (response.status === 200) {
					console.log("----------------------", response.status);
					dispatch({ type: "LOADING", payload: false });
				}
				setLoading(false);
			})
			.catch((e) => {
				console.log("axiosError::", e);
			});
	};

	useEffect(() => {
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

	let locSt = localStorage.getItem("A_E_W_S");
	let [state, dispatch] = useReducer(reducer, initialState, () => {
		if (locSt) {
			let dt = JSON.parse(locSt);
			console.log("data", dt);
			if (dt.data.length === 0) {
				getData();
				return;
			}
			return JSON.parse(locSt);
		} else {
			return initialState;
		}

		// return locSt ? JSON.parse(locSt) : initialState
	});

	useEffect(() => {
		dispatch({ type: "GRAND_TOTAL", payload: state.cart });
	}, [state.cart]);

	useEffect(() => {
		localStorage.setItem("A_E_W_S", JSON.stringify(state));
	}, [state]);

	return (
		<AppContext.Provider
			value={{
				state,
				addtocart,
				increase,
				decrease,
				remove,
				clearcart,
				loading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
