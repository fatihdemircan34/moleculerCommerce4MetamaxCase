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
	await prisma.product.create({
		data: { name: "Ürün 1", price: 150.50, brandId: marka1.id },
	});

	await prisma.product.create({
		data: { name: "Ürün 2", price: 90.99, brandId: marka1.id },
	});

	await prisma.product.create({
		data: { name: "Ürün 3", price: 299.99, brandId: marka2.id },
	});

	await prisma.product.create({
		data: { name: "Ürün 4", price: 499.99, brandId: marka2.id },
	});


	const client = await prisma.client.create({
		data: {
			name: "Ahmet Yılmaz",
			email: "ahmet@example.com",
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
