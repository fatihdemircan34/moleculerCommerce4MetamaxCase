const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductModel {
	async createProduct(data) {
		return await prisma.products.create({ data });
	}

	async getAllProducts() {
		return await prisma.products.findMany();
	}

	// Diğer Product işlemleri...
}

module.exports = new ProductModel();
