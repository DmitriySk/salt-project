import * as React from 'react';
import cn from 'classnames';

enum Type {
    rounded = 'rounded'
}

interface Theme {
    button: string,
    type_rounded: string
}

interface IProps {
    text: string,
    theme: Theme,
    className?: string,
    onClick: () => void,
    type?: Type
}

class Button extends React.Component<IProps, null> {
    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        const {
            text,
            className = '',
            type = '',
            theme
        } = this.props;

        const props = {
            onClick: this.handleClick,
            className: cn({
                [theme.button]: true,
                [className]: !!className,
                [theme[`type_${type}`]]: !!type
            })
        };

        return (
            <button {...props}>{text}</button>
        );
    }
}

export default Button;

export const ButtonType = Type;
