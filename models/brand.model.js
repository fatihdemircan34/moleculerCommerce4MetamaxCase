const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class BrandModel {
	async createBrand(data) {
		return await prisma.brand.create({ data });
	}

	async getAllBrands() {
		return await prisma.brand.findMany();
	}

	// Marka güncelleme
	async updateBrand(id, data) {
		return await prisma.brand.update({
			where: { id },
			data,
		});
	}

	// Marka silme
	async deleteBrand(id) {
		return await prisma.brand.delete({
			where: { id },
		});
	}
}

module.exports = new BrandModel();
