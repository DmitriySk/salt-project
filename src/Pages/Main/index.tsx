import * as React from 'react';

import Header from "../../containers/Header/index";
import About from "../../containers/About";
import Footer from "../../containers/Footer";
import Center from "../../containers/center";
import Resume from "../../containers/Resume";

interface IState {
	click_count: number;
}

export default class Main extends React.Component<void, IState> {
	constructor(props) {
		super(props);

		this.state = {
			click_count: 0
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.setState({
			click_count: this.state.click_count + 1
		});
	}

	render() {
		return <div className="main_page">
			<Header/>
			<About/>
			<Resume/>
		</div>
	}
}