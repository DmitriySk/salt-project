import * as React from "react";
const s = require("./style.css");

interface IProps {}

interface IState {}

export default class Header extends React.Component<IProps, IState> {
	render() {
		return <div className={s["m-header"]}>
			Header
		</div>;
	}
}