import type {PropsWithChildren} from 'react';
import cn from 'classnames';
import theme from './Icon.module.css';
import noop from 'lodash/noop';

type IProps = PropsWithChildren & {
    width?: number,
    height?: number,
    viewBox?: string,
    color?: string,
    fill?: boolean,
    stroke?: boolean,
    onClick?: () => void,
    className?: string
}

/**
 * Icon wrapper
 * */

const Icon = ({
                  width = 24, height = 24, color = '#000000', stroke = true, fill = false, viewBox = '0 0 24 24', children, onClick = noop, className = ''}: IProps) => {
    return (
        <span className={theme.icon} onClick={onClick}>
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
      </span>
    );
};

export default Icon;
