import * as React from 'react';

const s = require('./index.css');

interface IProps {
	image: string,
	width?: number,
	style?: any
}

export default function ImageButton({ style, image, width }: IProps): JSX.Element {
    return (
        <div className={s.image_button} style={style || {}}>
            <img
                style={{
                    width: width || 50
                }}
                src={image}/>
        </div>
    );
}
