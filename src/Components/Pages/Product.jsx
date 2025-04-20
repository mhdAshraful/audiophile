import React from "react";
import { useLocation } from "react-router";
import { AppData } from "../Contexts/DataContext";

import Buttons from "../Utils/Buttons";
import ImageLoader from "../Utils/ImageLoader";
import CatagoryThumb from "../Utils/CatagoryThumb";
import BestGears from "../Utils/BestGears";
import Footer from "../Utils/Footer";

const Product = () => {
	let { state, loading } = AppData();
	let { headphones, earphones, speakers } = state;
	// console.log("correnty loading?", loading);
	const location = useLocation();
	let path = location.pathname;
	let clicked_on_path = path.split("/");
	let val = clicked_on_path[1];
	// console.log("current path is", val);
	let productname = [];
	if (val === "headphones") {
		productname = headphones;
	} else if (val === "speakers") {
		productname = speakers;
	} else {
		productname = earphones;
	}

	return loading === true ? (
		<h3>please wait loading</h3>
	) : (
		<>
			<div className="product_list">
				{/* <h4> {productname ? productname[0].category : loading} </h4> */}
				<div className="prod_title">
					<h2>{val} </h2>
				</div>
				<div className="product_collection">
					{productname.map((item) => (
						<>
							<div
								className="product_card_container"
								key={item.id}
								id={`${item.id}`}
							>
								<div className="detImg">
									<ImageLoader
										className="product_card_image"
										sml={`.${item.categoryImage.mobile}`}
										mid={`.${item.categoryImage.tablet}`}
										lrg={`.${item.categoryImage.desktop}`}
									/>
								</div>
								<div className="detInfo">
									{item.new ? (
										<p className="over_line">new product</p>
									) : (
										<></>
									)}
									<h2 className="product_card_heading">
										{" "}
										{item.name}{" "}
									</h2>
									<p className="product_card_description">
										{item.description}
									</p>
									<Buttons
										button_type="filled_btn"
										name={"see product"}
										where={`/${item.category}/${item.slug}`}
									/>
								</div>
							</div>
						</>
					))}
				</div>
			</div>

			<CatagoryThumb />
			<BestGears />
			<Footer />
		</>
	);
};

export default Product;
