const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const { PrismaClient } = require('@prisma/client');
const {createOrder} = require("../models/order.model");
const {createOrderItem} = require("../models/order-item.model");
const prisma = new PrismaClient();

module.exports = {
	name: "order",
	mixins: [DbService],

	actions: {
		/**
		 * Checkout aksiyonu.
		 * Sipariş verilerini alır ve yeni bir Order oluşturur.
		 * İlgili OrderItem'ları da veritabanına ekler.
		 *
		 * @param {Object} orderData - Sipariş verileri
		 */
		checkout: {
			params: {

				clientAddress: "string",
				totalProductValue: "number",
				totalShippingValue: "number",
				products: { type: "array", items: "object" },
			},
			async handler(ctx) {
				const { client, clientAddress, totalProductValue, totalShippingValue, products } = ctx.params;

				// Yeni bir Order oluştur
				const order = await createOrder({
					data: {
						clientAddress,
						totalProductValue,
						totalShippingValue,
						client: {
							connect: { id: client.id }, // Var olan bir müşteriyle ilişkilendirme
						},
						// orderItems dizisini döngüye alıp her bir elemanı ilişkilendirme
						orderItems: {
							create: products.map(product => ({
								productId: product.productId,
								quantity: product.quantity,
								price: product.price,
							})),
						},
					},
				});


				// OrderItem'ları oluştur
				await Promise.all(products.map(async (products) => {
					const { productId, quantity, price } = products;
					return createOrderItem({
						data: {
							orderId: order.id,
							productId,
							quantity,
							price,
						},
					});
				}));

				return { message: "Sipariş başarıyla oluşturuldu", order };
			}
		},
	},
};
