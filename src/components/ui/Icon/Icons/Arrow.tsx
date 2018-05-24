import * as React from 'react';
import Icon from '../Icon';

/** Arrow Down Icon */
export default function LI({ ...props }) {
  return (
      <Icon
          {...props}
          viewBox="0 0 35 19"
          color='#FFC400'
          fill
      >
          <g transform="translate(451 2738)">
              <g>
                  <g>
                      <use xlinkHref="#path0_stroke" transform="translate(-450 -2737)"/>
                  </g>
                  <g>
                      <use xlinkHref="#path0_stroke" transform="translate(-450 -2733)"/>
                  </g>
              </g>
          </g>
          <defs>
              <path
                  id="path0_stroke"
                  d={`M 17 12.5L 16.7038 12.9028L 17.0092 13.1273L 17.3078 12.894L 17 12.5ZM -0.296195
                  0.402826L 16.7038 12.9028L 17.2962 12.0972L 0.296195 -0.402826L -0.296195 0.402826ZM
                  17.3078 12.894L 33.3078 0.394012L 32.6922 -0.394012L 16.6922 12.106L 17.3078 12.894Z`}
              />
          </defs>
      </Icon>
  );
}
