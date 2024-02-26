const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	const marka1 = await prisma.brand.create({
		data: {
			name: "Marka 1",
			description: "Marka 1 açıklaması",
		},
	});

	const marka2 = await prisma.brand.create({
		data: {
			name: "Marka 2",
			description: "Marka 2 açıklaması",
		},
	});

	// Ürünleri tek tek oluştur
	const urun1 = await prisma.product.create({
		data: { name: "Ürün 1", price: 150.50, brandId: marka1.id },
	});

	const urun2 = await prisma.product.create({
		data: { name: "Ürün 2", price: 90.99, brandId: marka1.id },
	});

	const urun3 = await prisma.product.create({
		data: { name: "Ürün 3", price: 299.99, brandId: marka2.id },
	});

	const urun4 = await prisma.product.create({
		data: { name: "Ürün 4", price: 499.99, brandId: marka2.id },
	});

	// Müşteri oluştur
	const client = await prisma.client.create({
		data: {
			name: "Ahmet Yılmaz",
			email: "ahmet@example.com",
			password: "$2b$10$BRcyASlwa8XE/51mP3PdB.j4Qpw0aE4XGRLkhUifuU3lzP1MmO9vu" //  password123
		}
	});

	// Sipariş oluştur
	const siparis1 = await prisma.order.create({
		data: {
			client: {
				connect: { id: client.id }
			},
			clientAddress: "Client Adresi 1",
			totalProductValue: urun1.price + urun2.price,
			totalShippingValue: 15,
			orderItems: {
				create: [
					{ product: { connect: { id: urun1.id } }, quantity: 1, price: urun1.price },
					{ product: { connect: { id: urun2.id } }, quantity: 2, price: urun2.price }
				]
			}
		}
	});

	console.log("Başlangıç verileri başarıyla eklendi.");
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
