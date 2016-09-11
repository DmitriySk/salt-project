import React from 'react';
import App from './Pages/Main';

export default {
	path: '/',
	indexRoute: {component: App},
	childRoutes: [
		require('./Pages/About/route')
	]
};