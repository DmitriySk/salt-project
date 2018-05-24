import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './mainstyle.scss';

ReactDom.hydrate(
	<Router routes={routes} history={browserHistory}/>,
	document.getElementById('app')
);