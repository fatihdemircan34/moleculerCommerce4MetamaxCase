// order.model.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Order {
	static async createOrder(data) {
		return await prisma.order.create(  data );
	}

	static async getOrderById(id) {
		return await prisma.order.findUnique({
			where: { id },
			include: { orderItems: true },
		});
	}


}

module.exports = Order;
