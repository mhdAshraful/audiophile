import React, { useEffect } from "react";
import { AppData } from "../Contexts/DataContext";
import Buttons from "../Utils/Buttons";
import Footer from "../Utils/Footer";
import { currecny } from "../Utils/Currecny";
import { useState } from "react";

const Checkout = () => {
	const { state, clearcart, dispatch } = AppData();
	const { grand_total } = state;
	const [thanks, setThanks] = useState(false);
	const [paymentMethod, setPayM] = useState("");
	const invoiceAmount = grand_total + 50 + grand_total * 0.2;

	const orderInformation = { ...state.cart, invoiceAmount };
	const [errors, setFormErrors] = useState({});

	const postOrder = async (e) => {
		e.preventDefault();
		console.log("before sending", orderInformation);

		setTimeout(() => {
			setThanks(true);
			// clearcart();
			setFormErrors({});
		}, 2600);
	};

	/* 
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │   To make sure car is calculated ever arter a GrRefresh,                    │
  │     we add a dispatch here .                                                │
  └─────────────────────────────────────────────────────────────────────────────┘
 */
	useEffect(() => {
		dispatch({ type: "GRAND_TOTAL" });
		console.log("cart js dispatch");
	}, [dispatch, state.cart]);

	return state.cart.length < 1 ? (
		<div>
			<p
				className="over_line"
				style={{ textAlign: "center", padding: "20px" }}
			>
				This page is under construction
			</p>
			<div className="emptyCheckpagePage">
				<p className="over_line"> Opps!! Empty Cart </p>
				<h4>Forgetting Something?</h4>
				<Buttons
					name={"take me to home page"}
					where={"/"}
					button_type={"bordered_btn"}
				/>
			</div>
			<Footer />
		</div>
	) : (
		<>
			<Buttons name={"Go Back"} where={"/"} button_type={"reg_btn"} />
			{/* <p className='over_line' style={{ "textAlign": "center" }} >This page is under construction</p> */}
			<div className="form_page">
				<form className="checkout">
					<div className="infomation">
						<h3>Checkout </h3>
						<p className="sub_title">Billing details</p>
						<div className="billing">
							<div className="input_field name">
								<label className="input_label" htmlFor="name">
									{" "}
									Name{" "}
								</label>
								<input type="text" placeholder="Alexi Ward" required />
							</div>
							<div className="input_field">
								<label className="input_label" htmlFor="email">
									{" "}
									Email{" "}
								</label>
								<input
									type="email"
									placeholder="alexi@email.com"
									required
								/>
							</div>
							<div className="input_field">
								<label className="input_label" htmlFor="phone">
									{" "}
									Phone Number{" "}
								</label>
								<input
									type="tel"
									placeholder="+1 6100 4343 456"
									required
								/>
							</div>
						</div>
						<p className="sub_title">Shipping Info</p>
						<div className="shipping">
							<div className="input_field">
								<label className="input_label" htmlFor="Your Address">
									{" "}
									Your Adress{" "}
								</label>
								<input
									type="text"
									placeholder="1111 Willims Avenue"
									required
								/>
							</div>
							<div className="input_field">
								<label className="input_label" htmlFor="Zip code">
									{" "}
									Zip code{" "}
								</label>
								<input type="text" placeholder="0000 NY" required />
							</div>
							<div className="input_field">
								<label className="input_label" htmlFor="City">
									{" "}
									City{" "}
								</label>
								<input type="text" placeholder="New York" required />
							</div>
							<div className="input_field">
								<label className="input_label" htmlFor="Country">
									{" "}
									Country{" "}
								</label>
								<input type="text" placeholder="America" required />
							</div>
						</div>
						<p className="sub_title">Payment Details</p>
						<div className="payment">
							{["e-money", "cash on delivery"].map((option, index) => {
								return (
									<div key={index} className="radio_field">
										<input
											type="radio"
											id={option}
											name="payment Method"
											required
										/>
										<label className="input_label" htmlFor={option}>
											{option}
										</label>
									</div>
								);
							})}
							{paymentMethod === "e_Money" ? (
								<div key={"paymentMethods"}>
									<div className="input_field">
										<label
											className="input_label"
											htmlFor="e-Money Number"
										>
											{" "}
											e-Money Number{" "}
										</label>
										<input
											type="text"
											placeholder="e.g 1 2 3 4 5 6"
											required
										/>
									</div>
									<div className="input_field">
										<label
											className="input_label"
											htmlFor="e-Money Pin"
										>
											{" "}
											e-Money Pin{" "}
										</label>
										<input type="text" placeholder="0000" required />
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>

					<div key={"summary"} className="summary">
						<h6 key={"heading_summary"}>Summary</h6>
						<div key={"details_summary"}>
							{state.cart.map((object) => {
								let { item, quantity } = object;
								return (
									<div key={item.id} className="item_container">
										<div className="item_left">
											<img
												className="item_image"
												src={`.${item.image.mobile}`}
												alt={item.name}
											/>
											<div className="item_details">
												<h6 className="item_name"> {item.name} </h6>
												<p className="item_price">
													{" "}
													{currecny(item.price)}{" "}
												</p>
											</div>
										</div>
										<p className="item_count"> x{quantity} </p>
									</div>
								);
							})}
						</div>

						<div className="item_totals">
							<div className="price">
								<p className="total">Total</p>
								<p className="total_amount">{currecny(grand_total)}</p>
							</div>
							<div className="price">
								<p className="total">Shipping</p>
								<p className="total_amount">{currecny(50)}</p>
							</div>
							<div className="price">
								<p className="total">vat</p>
								<p className="total_amount">
									{grand_total.toFixed(2) * 0.13}
								</p>
							</div>
							<div className=" price grand_total">
								<p className="total"> grand total</p>
								<p className="grand_total_amount">
									{currecny(grand_total + 50 + grand_total * 0.2)}
								</p>
							</div>
						</div>
						<Buttons
							onClick={(e) => postOrder(e)}
							className="filled_btn pay_btn"
							id="payBtn"
							name={"Continue & pay"}
							button_type={"filled_btn"}
							width={"100%"}
						/>
					</div>
				</form>
			</div>
			{thanks ? (
				<div className="thanks_container">
					<div className="thanks_confirmation">
						<svg
							width="64"
							height="64"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g fill="none" fillRule="evenodd">
								<circle fill="#D87D4A" cx="32" cy="32" r="32" />
								<path
									stroke="#FFF"
									strokeWidth="4"
									d="m20.754 33.333 6.751 6.751 15.804-15.803"
								/>
							</g>
						</svg>
						<h3>
							{" "}
							thank you <br /> for your order{" "}
						</h3>
						<p className="emailCon">
							You will receive an email confirmation shortly.
						</p>
						{
							<div className="view">
								<div
									className="item_container"
									key={state.cart[0].item.id}
								>
									<div className="item_top">
										<div className="item">
											<div className="img_cont">
												<img
													className="item_image"
													src={`.${state.cart[0].item.image.mobile}`}
													alt={state.cart[0].item.name}
												/>
											</div>
											<div className="item_details">
												<h6 className="item_name">
													{" "}
													{state.cart[0].item.name}{" "}
												</h6>
												<p className="item_price">
													{" "}
													{currecny(state.cart[0].item.price)}{" "}
												</p>
											</div>
											<div className="item_count">
												<p> x{state.cart[0].quantity} </p>
											</div>
										</div>
										<hr />
										<p>and {state.cart.length} other items</p>
									</div>
								</div>
								<div className="item_bottom">
									<p className="grand">Grand Total </p>
									<p>{currecny(invoiceAmount)}</p>
								</div>
							</div>
						}
						<Buttons
							onClick={() => {
								clearcart();
							}}
							where={"../"}
							width={"100%"}
							name={"back to home"}
							button_type={"filled_btn"}
						/>
					</div>
				</div>
			) : (
				<></>
			)}
			<Footer />
		</>
	);
};

export default Checkout;
