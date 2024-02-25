const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BrandModel {
	async createBrand(data) {
		return await prisma.brand.create({ data });
	}

	async getAllBrands() {
		return await prisma.brand.findMany();
	}

	// Diğer Brand işlemleri...
}

module.exports = new BrandModel();
