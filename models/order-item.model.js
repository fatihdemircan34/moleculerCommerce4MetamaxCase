const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BrandModel {
	async createBrand(data) {
		return await prisma.brand.create({ data });
	}

	async getAllBrands() {
		return await prisma.brand.findMany();
	}

	// Markayı güncelleme
	async updateBrand(id, data) {
		return await prisma.brand.update({
			where: { id },
			data,
		});
	}

	// Markayı silme
	async deleteBrand(id) {
		return await prisma.brand.delete({
			where: { id },
		});
	}

	// ID'ye göre marka sorgulama
	async getBrandById(id) {
		return await prisma.brand.findUnique({
			where: { id },
		});
	}
}

module.exports = new BrandModel();
