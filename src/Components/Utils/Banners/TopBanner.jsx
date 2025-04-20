import { AppData } from "../../Contexts/DataContext";
import ImageLoader from "../ImageLoader";
import Buttons from "../Buttons";
import React from "react";

export const TopBanner = () => {
	let { state, loading } = AppData();
	let { data } = state;

	let product = data.filter((item) =>
		item.slug === "xx99-mark-two-headphones" ? item : null
	)[0];

	const image = {
		mobile: "../assets/home/mobile/image-header.jpg",
		tablet: "../assets/home/tablet/image-header.jpg",
		desktop: "../assets/home/desktop/image-hero.jpg",
	};

	return loading ? (
		<>
			{" "}
			<h3>loading data</h3>{" "}
		</>
	) : (
		<>
			<div className="top_banner">
				<div id="top_bannerImg">
					<ImageLoader
						sml={image.mobile}
						mid={image.tablet}
						lrg={image.desktop}
					/>
				</div>
				<div className="info">
					<div className="new_info">
						{product.new ? (
							<p className="over_line">New product</p>
						) : (
							<></>
						)}
						<h1>{product.name}</h1>
						<p className="desc">
							Experience natural, lifelike audio and exceptional build
							quality made for the passionate music enthusiast.
						</p>
						<Buttons
							where={`${product.category}/${product.slug}`}
							name={"see prdouct"}
							button_type={"filled_btn"}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
