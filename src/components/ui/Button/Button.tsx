import React from 'react';
import cn from 'classnames';

const s = require('./Button.scss');

interface IProps {
    className?: string,
    onClick: () => void
}

class Button extends React.Component<IProps, null> {
    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        const { className = '' } = this.props;

        return (
            <button
                className={cn(s.button, className)}
                onClick={this.handleClick}
            />
        );
    }
}

export default Button;
