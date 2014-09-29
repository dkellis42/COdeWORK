'use strict';

module.exports = {
	db: 'mongodb://codework:adminpasspass@kahana.mongohq.com:10067/COdeWORK',
	// db: 'mongodb://localhost/mean-dev',

	app: {
		title: 'COdeWORK - Development Environment'
	},
	github: {
		clientID: process.env.GITHUB_ID || '56bfbf00a2beb4f0c1f8',
		clientSecret: process.env.GITHUB_SECRET || '1989dc3a27fd5e93de4dabbf2eb20c86da8ea7bd',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};