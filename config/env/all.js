'use strict';

module.exports = {
	app: {
		title: 'COdeWORK',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ngFitText/ng-FitText.js',
				'public/lib/socket.io-client/socket.io.js', 
				'public/lib/angularjs-geolocation/src/geolocation.js', 
				'public/lib/angular-socket-io/socket.io.js', 
				'public/lib/angular-socket-io/socket.js', 
				'public/lib/angular-socket-io/socket.io.js',
				'public/lib/angularjs-geolocation/src/geolocation.js',
				'http://maps.googleapis.com/maps/api/js?sensor=false',
				'http://cdn.pubnub.com/pubnub-3.1.min.js',
				'public/lib/lodash/dist/lodash.min.js',
				'public/lib/angular-google-maps/dist/angular-google-maps.min.js'

			]
		},
		css: [
			'public/modules/**/css/*.css',
			'public/stylesheets/bootstrap.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};