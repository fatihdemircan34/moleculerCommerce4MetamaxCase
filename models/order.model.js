// order.model.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Order {
	static async createOrder(data) {
		return await prisma.order.create({ data });
	}

	static async getOrderById(id) {
		return await prisma.order.findUnique({
			where: { id },
			include: { orderItems: true },
		});
	}

	// Siparişi güncelle
	static async updateOrder(id, data) {
		return await prisma.order.update({
			where: { id },
			data,
			include: { orderItems: true },
		});
	}

	// Siparişi sil
	static async deleteOrder(id) {
		return await prisma.order.delete({
			where: { id },
		});
	}

	static async getAllOrders() {
		return await prisma.order.findMany({
			include: { orderItems: true },
		});
	}
}

module.exports = Order;
