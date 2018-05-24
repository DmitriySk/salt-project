import * as React from 'react';

const s = require('./About.scss');

export default class About extends React.Component {
    render() {
        return (
            <div className={s.about}>
                <div className={s.bg_text}>ABOUT ME</div>
            </div>
        );
    }
}