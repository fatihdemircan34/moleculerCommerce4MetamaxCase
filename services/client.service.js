const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	name: "client",
	mixins: [DbService],

	actions: {
		// Müşteri Oluşturma
		createClient: {
			params: {
				name: "string",
				email: "string",
				password: "string" // Şifre alanını ekledik
			},
			async handler(ctx) {
				const { name, email, password } = ctx.params;
				const client = await prisma.client.create({
					data: {
						name,
						email,
						password // Şifre verisini de kaydediyoruz
					},
				});
				return client;
			},
		},

		// Tüm Müşterileri Listeleme
		listClients: {
			async handler() {
				return await prisma.client.findMany();
			},
		},

		// Müşteri Güncelleme
		updateClient: {
			params: {
				id: "number",
				name: { type: "string", optional: true },
				email: { type: "string", optional: true },
				password: { type: "string", optional: true } // Şifreyi güncellemek için parametre ekledik
			},
			async handler(ctx) {
				const { id, name, email, password } = ctx.params;
				const updateData = { name, email };
				if(password) updateData.password = password; // Şifre varsa güncelleme nesnesine ekliyoruz
				const client = await prisma.client.update({
					where: { id },
					data: updateData,
				});
				return client;
			},
		},

		// Müşteri Silme
		deleteClient: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				await prisma.client.delete({
					where: { id },
				});
				return { message: "Client deleted successfully." };
			},
		},

		// Müşteriye Ait Siparişleri Sorgulama
		getClientOrders: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				const clientOrders = await prisma.client.findUnique({
					where: { id },
					include: { orders: true }, // Müşteriye ait siparişler dahil ediliyor
				});
				return clientOrders;
			},
		},
	},
};
