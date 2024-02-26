const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	name: "brand",
	mixins: [DbService],

	actions: {
		// Marka oluşturma
		async create(ctx) {
			const { name, description } = ctx.params;
			return await prisma.brand.create({ data: { name, description } });
		},

		// Tüm markaları listeleme
		async list() {
			return await prisma.brand.findMany();
		},

		// Marka güncelleme
		update: {
			params: {
				id: "number",
				name: { type: "string", optional: true },
				description: { type: "string", optional: true }
			},
			async handler(ctx) {
				const { id, name, description } = ctx.params;
				return await prisma.brand.update({
					where: { id },
					data: { name, description },
				});
			},
		},

		// Marka silme
		delete: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				return await prisma.brand.delete({
					where: { id },
				});
			},
		},
	},
};
