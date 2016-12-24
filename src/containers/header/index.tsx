import * as React from "react";
const s = require("./style.css");
const name_svg = require('./name.svg');
console.log(name_svg);
interface IProps {}

interface IState {}

export default class Header extends React.Component<IProps, IState> {
	render() {

		return <div className={s["m-header"]}>
			<div className={s["m-header-topline"]}/>
			<div className={s['m-header-inner']}>
				<div>
					<img className={s['m-header-name-img']} src={name_svg} />
				</div>
				<div></div>
			</div>
			<div className={s['m-header-bottomline']}/>
		</div>;
	}
}