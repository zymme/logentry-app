"use strict";

const _ = require("lodash");
const ApiGateway = require("moleculer-web");
const swaggerJSDoc = require("swagger-jsdoc");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		cors: {
			origin: "*",
			// Configures the Access-Control-Allow-Methods CORS header.
      methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
      // Configures the Access-Control-Allow-Headers CORS header.
      allowedHeaders: ["Content-Type"],
      // Configures the Access-Control-Expose-Headers CORS header.
      exposedHeaders: [],
      // Configures the Access-Control-Allow-Credentials CORS header.
      credentials: false,
      // Configures the Access-Control-Max-Age CORS header.
      maxAge: 3600
		},

		routes: [{
			path: "/api",
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			],

			aliases: {

				// runlog
				"POST /logentry": "logentry.create",
				"GET /logentry/:id": "logentry.get"
			}
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}

	}
};
