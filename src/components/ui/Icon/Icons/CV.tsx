import * as React from 'react';
import Icon from '../Icon';

/** Arrow Down Icon */
export default function CV({ ...props }) {
  return (
      <Icon
          {...props}
          viewBox="-2 -2 63 63"
          color='#ffbc00'
          fill
      >
          <path
                d={`M949.67,673a29.17,29.17,0,1,0,29.17,29.17A29.17,29.17,0,0,0,949.67,673ZM937,
                709.27a3.93,3.93,0,0,0,3.35,1.61q3.49,0,4.26-4.54l5.45,0.33a9.67,9.67,0,0,1-3.21,
                6.55,10.75,10.75,0,0,1-14.31-1q-3-3.29-3-9.09a13.44,13.44,0,0,1,2.88-8.89,9.7,9.7,
                0,0,1,7.88-3.46q8.65,0,9.74,9.3l-5.89.37q-0.12-5.08-4-5.08-4.4,0-4.4,7.82Q935.84,
                707.66,937,709.27Zm26.89,5.83h-6l-7.21-24h6l4.8,17.16,5-17.16h4.71Z`}
                transform="translate(-920.5 -673)"/>
      </Icon>
  );
}
