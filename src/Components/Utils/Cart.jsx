import React, { useEffect } from "react";
import { AppData } from "../Contexts/DataContext";
import Buttons from "./Buttons";
import { currecny } from "./Currecny";

const Cart = ({ setShowcart }) => {
	const { state, increase, decrease, clearcart, dispatch } = AppData();
	const { grand_total } = state;
	console.log("cart component data-------------", state.cart);

	useEffect(() => {
		dispatch({ type: "GRAND_TOTAL" });
		console.log("cart js dispatch");
	}, [dispatch, state.cart]);

	return (
		<div className="cart_page">
			<div className="cart_container">
				<div className="cart_grp">
					<div className="cart_grp_one">
						<h6>Cart ({state.cart.length})</h6>
						<p className="btn_clear_cart" onClick={() => clearcart()}>
							{" "}
							Remove All
						</p>
					</div>
					{state.cart.map((object) => {
						console.log(object);
						let { item, quantity } = object;
						return (
							<div className="cart_grp_two" key={`${object.item._id}`}>
								<div className="img_title">
									<div className="grp_item_image">
										{/* image */}
										{/* <ImageLoader sml={`.${item.categoryImage.mobile}`} mid={`.${item.categoryImage.tablet}`} lrg={`.${item.categoryImage.desktop}`} /> */}
										<img
											src={`.${item.categoryImage.mobile}`}
											alt={`${item.slug}`}
										/>
									</div>
									<div className="grp_item_title">
										<p className="item_name">{item.name}</p>
										<p className="item_price">
											{currecny(item.price)}
										</p>
									</div>
								</div>
								<div className="grp_item_actions increment">
									{/* <HiTrash onClick={() => remove(item)} /> */}
									<span
										className="incrementer inc_btn"
										onClick={() => decrease(item)}
									>
										{" "}
										-{" "}
									</span>
									<span className="incrementNumber">{quantity}</span>
									<span
										className="incrementer inc_btn"
										onClick={() => increase(item)}
									>
										{" "}
										+{" "}
									</span>
								</div>
							</div>
						);
					})}
					<div className="cart_grp_three  grp_item_total">
						<p className="uppercase">total</p>
						<p className="currency">{currecny(grand_total.toFixed(2))}</p>
					</div>
					<Buttons
						className="btn_checkout"
						name={"Checkout"}
						button_type={"filled_btn"}
						where={"/checkout"}
						onClick={() => setShowcart(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Cart;
