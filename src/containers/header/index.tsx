import * as React from "react";
import ImageButton from '../../components/ui/ImageButton';

const s = require("./style.css");

const name_svg = require('./name.svg');
const icons: string[] = [
	require('./btn_github.svg'),
	require('./btn_cv.svg'),
	require('./btn_li.svg')
];

interface IProps {}

interface IState {}

export default class Header extends React.Component<IProps, IState> {
	render() {
		const icons_btns = icons.map((icon: string, i: number) => {
			return <ImageButton
				key={i}
				style={{
					margin: '0 10px'
				}}
				image={icon}
				width={60}
			/>;
		});

		return <div className={s['m-header']}>
			<div className={s['m-header-topline']}/>
			<div className={s['m-header-inner']}>
				<div className={s['m-header-inner-name']}>
					<img className={s['m-header-name-img']} src={name_svg} />
				</div>
				<div className={s['m-header-inner-icons']}>
					{icons_btns}
				</div>
			</div>
			<div className={s['m-header-bottomline']}/>
		</div>;
	}
}