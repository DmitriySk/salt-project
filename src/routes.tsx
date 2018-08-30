import * as React from 'react';
import App from './Pages/Main';
import Tools from './Pages/Tools/index';

export default {
	path: '/',
	indexRoute: {component: App},
	childRoutes: [
		{
			path: '/tools',
			component: Tools
		}
	]
};