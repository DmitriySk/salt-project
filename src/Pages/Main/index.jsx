import React from 'react';
import {Link} from 'react-router';

export default class Main extends React.Component {
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
			<button onClick={this.onClick}>Main Page</button>
			<br/><br/>
			<span>Clicks {this.state.click_count}</span>
			<Link to="/about">About</Link>
		</div>
	}
}