import { themr } from 'react-css-themr';
import Button, { ButtonType } from './Button';

const theme = require('./Button.scss');

export default themr('Button', theme)(Button);
export { ButtonType };
