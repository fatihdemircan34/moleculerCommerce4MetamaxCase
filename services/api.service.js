const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		routes: [{
			path: "/api",
			aliases: {
				"GET brands": "brand.list",
				"POST brands": "brand.create",
				"GET products": "product.list",
				"POST products": "product.create",
				"POST checkout": "order.checkout"
			}
		}],
		assets: {
			folder: "public",
			// `public` klasöründeki tüm statik dosyaları sunar
			options: {}
		}
	}
};
