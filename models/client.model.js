const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ClientModel {
	// Müşteri oluşturma
	async createClient({ name, email, password }) {
		return await prisma.client.create({
			data: {
				name,
				email,
				password
			},
		});
	}

	// Tüm müşterileri listeleme
	async getAllClients() {
		return await prisma.client.findMany();
	}

	// Müşteri güncelleme
	async updateClient(id, data) {
		return await prisma.client.update({
			where: { id },
			data,
		});
	}

	// Müşteri silme
	async deleteClient(id) {
		return await prisma.client.delete({
			where: { id },
		});
	}

	// ID'ye göre müşteri sorgulama
	async getClientById(id) {
		return await prisma.client.findUnique({
			where: { id },
		});
	}

	// Siparişlerle birlikte müşteri bilgilerini getirme
	async getClientWithOrders(id) {
		return await prisma.client.findUnique({
			where: { id },
			include: { orders: true },
		});
	}
}

module.exports = new ClientModel();
