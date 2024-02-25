// orderItem.model.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderItem {
	static async createOrderItem(data) {
		return await prisma.orderItem.create( data );
	}

	static async getOrderItemsByOrderId(orderId) {
		return await prisma.orderItem.findMany({
			where: { orderId },
		});
	}

	// Diğer gerekli işlevler...
}

module.exports = OrderItem;
