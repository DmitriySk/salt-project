import * as React from 'react';

const s = require('./index.css');

interface IProps {
	image: string,
	width?: number,
	style?: any
}

export default class ImageButton extends React.Component<IProps, void> {
	render() {
		return <div className={s.image_button} style={this.props.style || {}}>
			<img
				style={{
					width: this.props.width || 50
				}}
				src={this.props.image}/>
		</div>;
	}
}