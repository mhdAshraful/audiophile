import React, { useState } from "react";
import { useLocation } from "react-router";
import { AppData } from "../Contexts/DataContext";
import Buttons from "../Utils/Buttons";
import { currecny } from "../Utils/Currecny";
import ImageLoader from "../Utils/ImageLoader";
import CatagoryThumb from "../Utils/CatagoryThumb";
import BestGears from "../Utils/BestGears";
import Footer from "../Utils/Footer";

const ProductDetails = () => {
	// console.log("product detailes called");
	let { state, addtocart } = AppData();
	let { data, headphones, speakers, earphones } = state;

	let [quantity, setquantity] = useState(1);
	const location = useLocation();
	let path = location.pathname;
	// console.log("path", path);

	let clicked_on_path = path.split("/");
	let category = clicked_on_path[1];
	let slug_val = clicked_on_path[2];
	let productname = [];

	if (category === "headphones") {
		productname = headphones;
	} else if (category === "earphones") {
		productname = earphones;
	} else if (category === "speakers") {
		productname = speakers;
	}

	let selected_Item = productname.filter((it) =>
		it.slug === slug_val ? it : null
	)[0];

	const handDEC = () => setquantity((prev) => prev - 1);

	const handINC = () => setquantity((prev) => prev + 1);

	function findProduct(slug, data) {
		let found = data.filter((item) => (slug === item.slug ? item : null));
		return found[0];
	}

	return (
		<>
			<Buttons
				button_type="reg_btn"
				where={`../${category}/`}
				name="Go Back"
			/>
			<div className="selected_item" key={selected_Item.id}>
				<div className="dtl_top_grp">
					<div className="dtl_grp_one">
						<ImageLoader
							sml={`.${selected_Item.image.mobile}`}
							mid={`.${selected_Item.image.tablet}`}
							lrg={`.${selected_Item.image.desktop}`}
							alt={`${selected_Item.name}`}
						/>
					</div>
					<div className="dtl_grp_two">
						{selected_Item.new ? (
							<h4 className="over_line elm">new product </h4>
						) : (
							<></>
						)}
						<h2 className="elm">{selected_Item.name}</h2>
						<p className="description elm">{selected_Item.description}</p>
						<p className="elm grp_two_price">
							{" "}
							{currecny(selected_Item.price)}
						</p>
						<div className="dtl_grp_three">
							<div className="increment">
								<span
									className="incrementer inc_btn"
									onClick={() => handDEC()}
								>
									{" "}
									-{" "}
								</span>
								<span className="incrementer">{quantity}</span>
								<span
									className="incrementer inc_btn"
									onClick={() => handINC()}
								>
									{" "}
									+{" "}
								</span>
							</div>
							<Buttons
								className="filled_btn"
								name={"Add to cart"}
								button_type={"filled_btn"}
								onClick={() => addtocart(selected_Item, quantity)}
							/>
						</div>
					</div>
				</div>

				<div className="four_five">
					<div className="dtl_grp_four">
						<h4 className="elm">Features</h4>
						<p className="selected_item_features elm">
							{" "}
							{selected_Item.features}{" "}
						</p>
					</div>

					<div className="dtl_grp_five">
						<div>
							<h4 className="elm">In the box</h4>
						</div>
						<div>
							{selected_Item.includes.map((included, index) => (
								<p className="icluded_items elm" key={index}>
									<span>{included.quantity}x </span> &nbsp; &nbsp;
									&nbsp;
									<span>{included.item}</span>
								</p>
							))}
						</div>
					</div>
				</div>

				<div className="dtl_grp_six selected_item_gallery">
					{Object.entries(selected_Item.gallery).map(([key, value]) => {
						return (
							<div className={`gallery-${key}`} key={key}>
								<ImageLoader
									sml={`.${value.mobile}`}
									mid={`.${value.tablet}`}
									lrg={`.${value.desktop}`}
									alt={value}
								/>
							</div>
						);
					})}
				</div>

				<h3 className="grp_seven">You may also like</h3>
				<div className="dtl_grp_seven">
					{selected_Item.others.map((item, index) => (
						<div key={item.name + index} className="others">
							<ImageLoader
								sml={`.${item.image.mobile}`}
								mid={`.${item.image.tablet}`}
								lrg={`.${item.image.desktop}`}
							/>
							<h5>{item.name}</h5>
							<Buttons
								where={`/${findProduct(item.slug, data).category}/${
									item.slug
								}`}
								button_type={"filled_btn"}
								name={"see product"}
							/>
						</div>
					))}
				</div>

				{/* item.image.map((imgs) => {
                        <ImageLoader sml={`${imgs.mobile}`} mid={`${imgs.tablet}`} lrg={`${imgs.desktop}`} />
                  })
                                    Object.key((f_s_t) => {
                        console.log("obj keys", f_s_t)
                  }) */}
			</div>

			<CatagoryThumb />
			<BestGears />
			<Footer />
		</>
	);
};

export default ProductDetails;
