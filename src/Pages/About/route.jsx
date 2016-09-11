if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };
module.exports = {
	path: 'about',

	getIndexRoute(partialNextState, callback) {
		require.ensure([], function (require) {
			callback(null, {
				component: require('./index').default,
			})
		})
	},

	getChildRoutes(partialNextState, callback) {
		require.ensure([], function (require) {
			callback(null, [
				require('../Dima/route'),
			])
		})
	}
};