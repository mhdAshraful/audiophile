import React, { createContext, useContext, useReducer } from "react";

const OrderContext = createContext();
export const OrderData = () => useContext(OrderContext);

let initialState = {
	userName: "",
	userEmail: "",
	userPhone: "",
	userAddress: "",
	userPostCode: "",
	userCity: "",
	userCountry: "",
	paymentMethod: "",
	e_Number: "",
	e_Pin: "",
};

export const OrderContextWrapper = ({ children }) => {
	const options = ["e_Money", "Cash_on_delivery"];
	const handlePaymentOptions = (e) => {
		setPayment(e.target.value);
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "RESET_FORM": {
				return {
					userName: "",
					userEmail: "",
					userPhone: "",
					userAddress: "",
					userPostCode: "",
					userCity: "",
					userCountry: "",
					paymentMethod: "",
					e_Number: "",
					e_Pin: "",
				};
			}
			case "NAME": {
				let userName = action.payload;
				return { ...state, userName };
			}
			case "EMAIL": {
				let userEmail = action.payload;
				return { ...state, userEmail };
			}
			case "PHONE": {
				let userPhone = action.payload;
				return { ...state, userPhone };
			}
			case "ADDRESS": {
				let userAddress = action.payload;
				return { ...state, userAddress };
			}
			case "POST": {
				let userPostCode = action.payload;
				return { ...state, userPostCode };
			}
			case "CITY": {
				let userCity = action.payload;
				return { ...state, userCity };
			}
			case "COUNTRY": {
				let userCountry = action.payload;
				return { ...state, userCountry };
			}
			case "PAYMENT": {
				let paymentMethod = action.payload;
				return { ...state, paymentMethod };
			}
			case "E_NUMBER": {
				let e_Number = action.payload;

				return { ...state, e_Number };
			}
			case "E_PIN": {
				let e_Pin = action.payload;

				return { ...state, e_Pin };
			}
			case "SAY THANKS": {
				return state;
			}
			default:
				return null;
		}
	};

	const resetForm = () => dispatch({ type: "RESET_FORM" });
	const setName = (e) => dispatch({ type: "NAME", payload: e.target.value });
	const setEmail = (e) => dispatch({ type: "EMAIL", payload: e.target.value });
	const setPhone = (e) => dispatch({ type: "PHONE", payload: e.target.value });
	const setAddress = (e) =>
		dispatch({ type: "ADDRESS", payload: e.target.value });
	const setPostCode = (e) =>
		dispatch({ type: "POST", payload: e.target.value });
	const setCity = (e) => dispatch({ type: "CITY", payload: e.target.value });
	const setCountry = (e) =>
		dispatch({ type: "COUNTRY", payload: e.target.value });
	const setPayment = (x) => dispatch({ type: "PAYMENT", payload: x });
	const setENUMB = (e) =>
		dispatch({ type: "E_NUMBER", payload: e.target.value });
	const setEPIN = (e) => dispatch({ type: "E_PIN", payload: e.target.value });

	const [orderState, dispatch] = useReducer(reducer, initialState);

	return (
		<OrderContext.Provider
			value={{
				orderState,
				options,
				handlePaymentOptions,
				resetForm,
				setName,
				setEmail,
				setPhone,
				setAddress,
				setPostCode,
				setCity,
				setCountry,
				setPayment,
				setENUMB,
				setEPIN,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

// function sendData(data) {
// 	console.log("called send data");
// 	let url = `${BASE_URL}/api/orderDetails`;
// 	let result = undefined;
// 	axios
// 		.post(url, data, {
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json;charset=UTF-8",
// 			},
// 		})
// 		.then((res) => {
// 			// setTthanks(true);
// 			console.log(res.data);
// 			result = res.data;
// 		})
// 		.catch((e) => {
// 			result = { "axios errors": e };
// 			console.log("axios errors:", e);
// 		});
// }
