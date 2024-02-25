const DbService = require("moleculer-db");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
	name: "product",
	mixins: [DbService],

	actions: {
		async create(ctx) {
			const { name, price, brandId } = ctx.params;
			return await prisma.product.create({ data: { name, price, brandId } });
		},

		async list() {
			return await prisma.product.findMany({
				include: {
					brand: true, // İlişkili marka bilgilerini de getir
				},
			});
		},
	}
};
