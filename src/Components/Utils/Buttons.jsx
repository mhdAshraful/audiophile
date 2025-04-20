import React from "react";
import { Link } from "react-router";
import SVG from "./SVG";

/**
 *
 * @param {*} button_type - type of the button takes following values
 * types must be borderless_btn,  bordered_btn,  filled_btn,  nav_btn
 * @param {String} name - name of the button
 * @returns
 */
const Buttons = (props) => {
	switch (props.button_type) {
		case "bordered_btn":
			return (
				<Link to={props.where}>
					<button className="aLink bordered_btn" onClick={props.onClick}>
						{props.name}
					</button>
				</Link>
			);
		case "borderless_btn":
			return (
				<Link to={props.where}>
					<button className="aLink borderless_btn" onClick={props.onClick}>
						{props.name} <SVG name={"icon-right"} />
					</button>
				</Link>
			);
		case "filled_btn":
			return (
				//
				<Link
					to={props.where}
					style={{ width: props.width ? `${props.width}` : "160px" }}
				>
					<button
						className="aLink filled_btn"
						onClick={props.onClick}
						style={{ width: props.width ? `${props.width}` : "160px" }}
					>
						{props.name}
					</button>
				</Link>
			);
		case "nav_btn":
			return (
				// style={{ width: props.width ? `${props.width}` : "160px" }}
				<Link to={props.where}>
					<button className=" aLink nav_btn" onClick={props.onClick}>
						{props.name}
					</button>
				</Link>
			);
		default:
			return (
				<Link to={props.where}>
					<button className="aLink reg_btn" onClick={props.onClick}>
						{props.name}
					</button>
				</Link>
			);
	}
};

export default Buttons;
