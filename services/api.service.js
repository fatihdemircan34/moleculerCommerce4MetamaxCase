const ApiGateway = require("moleculer-web");
const jwt = require("jsonwebtoken");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		routes: [{
			path: "api/auth",
			aliases: {
				// Publicly accessible routes
				"POST register": "auth.register",
				"POST login": "auth.login",
			}
		}, {
			path: "/api",
			aliases: {
				// Protected routes requiring authentication
				"GET brands": "brand.list",
				"POST brands": "brand.create",
				"PUT brands/:id": "brand.update",
				"DELETE brands/:id": "brand.delete",
				"GET brands/:id": "brand.get",

				"GET products": "product.list",
				"POST products": "product.create",
				"PUT products/:id": "product.update",
				"DELETE products/:id": "product.delete",
				"GET products/:id": "product.get",

				"POST checkout": "order.checkout",
				"GET orders": "order.listOrders",
				"PUT orders/:id": "order.updateOrder",
				"DELETE orders/:id": "order.deleteOrder",
				"GET orders/:id": "order.getOrder",

				"POST clients": "client.createClient",
				"GET clients": "client.listClients",
				"PUT clients/:id": "client.updateClient",
				"DELETE clients/:id": "client.deleteClient",
				"GET clients/:id": "client.getClient",
				"GET clients/:id/orders": "client.getClientOrders",
			},
			// Use authorization middleware for protected routes
			authorization: true,
		}],
		// Define the JWT secret key for token verification
		JWT_SECRET: process.env.JWT_SECRET || "s3cr3tKEY",

		assets: {
			folder: "public",
		}
	},

	methods: {
		/**
		 * Authorization method to verify JWT token from Authorization header.
		 */
		authorize(ctx, route, req, res) {
			// Get the token from the Authorization header
			let auth = req.headers["authorization"];
			if (auth && auth.startsWith("Bearer ")) {
				let token = auth.slice(7);
				try {
					// Verify JWT token
					let decoded = jwt.verify(token, this.settings.JWT_SECRET);
					// If verification is successful, attach user to context meta
					ctx.meta.user = decoded;
					return Promise.resolve(ctx);
				} catch (err) {
					// If verification fails, throw an UnauthorizedError
					return Promise.reject(new ApiGateway.Errors.UnAuthorizedError(ApiGateway.Errors.ERR_INVALID_TOKEN));
				}
			} else {
				// No token provided, throw an UnauthorizedError
				return Promise.reject(new ApiGateway.Errors.UnAuthorizedError(ApiGateway.Errors.ERR_NO_TOKEN));
			}
		}
	}
};
