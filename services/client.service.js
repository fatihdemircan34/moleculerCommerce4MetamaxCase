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
				email: "string"
			},
			async handler(ctx) {
				const { name, email } = ctx.params;
				const client = await prisma.client.create({
					data: {
						name,
						email
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
				email: { type: "string", optional: true }
			},
			async handler(ctx) {
				const { id, name, email } = ctx.params;
				const client = await prisma.client.update({
					where: { id },
					data: { name, email },
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
	},
};
