import * as React from 'react';
import Icon from '../Icon';

/** Arrow Down Icon */
export default function LI({ ...props }) {
  return (
      <Icon
          {...props}
          viewBox="-2 -2 63 63"
          color='#ffbc00'
          fill
      >
          <path
                d={`M1045,673.17a29.17,29.17,0,1,0,29.17,29.17A29.17,29.17,0,0,0,1045,
                673.17Zm-7.29,43.29h-7.29V690.94h7.29v25.52Zm-3.42-27.09a3.42,3.42,0,1,
                1,3.42-3.42A3.42,3.42,0,0,1,1034.25,689.38Zm28.94,27.09h-7.29V700.68c0-1.85-.53-3.14-2.8-3.14a4.37,
                4.37,0,0,0-4.49,3.14v15.78h-7.29V690.94h7.29v2.44a12.2,12.2,0,0,1,7.29-2.44c2.36,0,
                7.29,1.41,7.29,10v15.56h0Z`}
                transform="translate(-1015.79 -673.17)"/>
      </Icon>
  );
}
