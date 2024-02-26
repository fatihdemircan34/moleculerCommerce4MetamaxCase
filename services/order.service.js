const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

// E-posta göndermek için konfigürasyon
const transporter = nodemailer.createTransport({
	service: 'gmail', // E-posta servisiniz (örneğin: Gmail, Outlook vb.)
	auth: {
		user: 'your_email@gmail.com', // E-posta adresiniz
		pass: 'your_password' // E-posta hesabınızın şifresi
	}
});


module.exports = {
	name: "order",
	mixins: [DbService],

	actions: {
		// Checkout action
		checkout: {
			params: {
				clientAddress: "string",
				totalProductValue: "number",
				totalShippingValue: "number",
				products: { type: "array", items: "object" },
			},
			async handler(ctx) {
				// Extract user ID from JWT token
				const userId = ctx.meta.user.id;

				const { clientAddress, totalProductValue, totalShippingValue, products } = ctx.params;

				const order = await prisma.order.create({
					data: {
						clientAddress,
						totalProductValue,
						totalShippingValue,
						client: {
							connect: { id: userId },
						},
						orderItems: {
							create: products.map(product => ({
								productId: product.productId,
								quantity: product.quantity,
								price: product.price,
							})),
						},
					},
				});
				await ctx.call('order.sendEmailToAdmin', { orderDetails: order });
				return { message: "Order successfully created", order };

			},
		},

		// List orders
		listOrders: {
			async handler(ctx) {
				const userId = ctx.meta.user.id; // Assuming ctx.meta.user is populated

				return await prisma.order.findMany({
					where: {
						clientId: userId
					},
					include: {
						orderItems: true,
					},
				});
			},
		},


		sendEmailToAdmin: {
			async handler(ctx) {
				const { orderDetails } = ctx.params; // Sipariş detayları
                console.log(JSON.stringify(orderDetails));
				// E-posta mesajı oluşturma
				let mailOptions = {
					from: 'your_email@gmail.com', // Gönderici adresi
					to: 'admin_email@example.com', // Alıcı adresi (admin)
					subject: 'Yeni Sipariş Bildirimi',
					text: `Yeni bir sipariş alındı. Sipariş detayları: ${JSON.stringify(orderDetails)}`
				};

				// E-postayı gönder
				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log('Email gönderme hatası:', error);
					} else {
						console.log('Email gönderildi: ' + info.response);
					}
				});
			}
		},


		// Update order
		updateOrder: {
			params: {
				id: "number",
				clientAddress: { type: "string", optional: true },
				totalProductValue: { type: "number", optional: true },
				totalShippingValue: { type: "number", optional: true },
			},
			async handler(ctx) {
				const userId = ctx.meta.user.id;
				const { id, clientAddress, totalProductValue, totalShippingValue } = ctx.params;

				// Ensure the order belongs to the user
				const existingOrder = await prisma.order.findUnique({ where: { id } });
				if (!existingOrder || existingOrder.clientId !== userId) {
					throw new Error("Order not found or user not authorized");
				}

				return await prisma.order.update({
					where: { id },
					data: { clientAddress, totalProductValue, totalShippingValue },
				});
			},
		},

		// Delete order
		deleteOrder: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const userId = ctx.meta.user.id;
				const { id } = ctx.params;

				// Ensure the order belongs to the user
				const existingOrder = await prisma.order.findUnique({ where: { id } });
				if (!existingOrder || existingOrder.clientId !== userId) {
					throw new Error("Order not found or user not authorized");
				}

				await prisma.order.delete({
					where: { id },
				});
				return { message: "Order successfully deleted." };
			},
		},

	},
};
