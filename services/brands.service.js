const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
	name: "brand",
	mixins: [DbService],

	actions: {
		async create(ctx) {
			const { name, description } = ctx.params;
			return await prisma.brand.create({ data: { name, description } });
		},

		async list() {
			return await prisma.brand.findMany();
		},
	}
};
