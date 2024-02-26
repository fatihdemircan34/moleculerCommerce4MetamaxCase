const DbService = require("moleculer-db");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
	name: "product",
	mixins: [DbService],

	actions: {
		// Ürün oluşturma
		async create(ctx) {
			const { name, price, brandId } = ctx.params;
			return await prisma.product.create({ data: { name, price, brandId } });
		},

		// Tüm ürünleri listeleme
		async list() {
			return await prisma.product.findMany({
				include: {
					brand: true, // İlişkili marka bilgilerini de getir
				},
			});
		},

		// Ürün güncelleme
		update: {
			params: {
				id: "number",
				name: { type: "string", optional: true },
				price: { type: "number", optional: true },
				brandId: { type: "number", optional: true }
			},
			async handler(ctx) {
				const { id, name, price, brandId } = ctx.params;
				return await prisma.product.update({
					where: { id },
					data: { name, price, brandId },
				});
			},
		},

		// Ürün silme
		delete: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				return await prisma.product.delete({
					where: { id },
				});
			},
		},

		// ID'ye göre ürün sorgulama
		get: {
			params: {
				id: "number",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				return await prisma.product.findUnique({
					where: { id },
					include: {
						brand: true, // İlişkili marka bilgilerini de getir
					},
				});
			},
		},
	},
};
