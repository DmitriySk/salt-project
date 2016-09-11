import React from 'react';
import {Link} from 'react-router';

export default class About extends React.Component {
	render() {
		return <div className="about_page">
			<span>About Page</span>
			<Link to="/about/dima">Dima</Link>
		</div>
	}
}