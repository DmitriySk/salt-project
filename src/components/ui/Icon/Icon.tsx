import * as React from 'react';
import cn from 'classnames';

const theme = require('./Icon.scss');

interface ITheme {
    icon_svg: string,
    icon: string
}

interface IProps {
    width?: number,
    height?: number,
    viewBox?: string,
    children: any,
    color?: string,
    fill?: boolean,
    stroke?: boolean,
    onClick?: () => void,
    className?: string
}

/**
 * Icon wrapper
 * */
class Icon extends React.Component<IProps, null> {
    public static defaultProps: Partial<IProps> = {
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        color: '#000000',
        fill: false,
        stroke: true,
        onClick: () => {}
    };

    /** get svg */
    private getSvg() {
        const {
            width,
            height,
            color,
            stroke,
            fill,
            viewBox,
            children,
            className
        } = this.props;

        return (
            <svg
                className={cn({
                    [theme.icon_svg]: true,
                    [className]: !!className
                })}
                width={`${width}px`}
                height={`${height}px`}
                viewBox={viewBox}
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                stroke={stroke ? color : 'none'}
                fill={fill ? color : 'none'}>
                {children}
            </svg>
        );
    }

    public render() {
        const props = {
            onClick: this.props.onClick,
            className: theme.icon
        };

        return (
            <span {...props}>
        {this.getSvg()}
      </span>
        );
    }
}

export default Icon;
