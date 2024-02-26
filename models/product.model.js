const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductModel {
	async createProduct(data) {
		return await prisma.product.create({ data }); // Dikkat: `prisma.products` yerine `prisma.product` olmalı.
	}

	async getAllProducts() {
		return await prisma.product.findMany(); // Dikkat: `prisma.products` yerine `prisma.product` olmalı.
	}

	// Ürünü güncelleme
	async updateProduct(id, data) {
		return await prisma.product.update({
			where: { id },
			data,
		});
	}

	// Ürünü silme
	async deleteProduct(id) {
		return await prisma.product.delete({
			where: { id },
		});
	}

	// ID'ye göre ürün sorgulama
	async getProductById(id) {
		return await prisma.product.findUnique({
			where: { id },
		});
	}
}

module.exports = new ProductModel();
