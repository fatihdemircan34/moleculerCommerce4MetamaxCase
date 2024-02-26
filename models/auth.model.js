
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class AuthModel {
	async register(email, password, name) {
		const hashedPassword = await bcrypt.hash(password, 10);
		return prisma.client.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});
	}

	async login(email, password) {
		const user = await prisma.client.findUnique({ where: { email } });
		if (!user) {
			throw new Error('User not found');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Incorrect password');
		}

		const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
		return { user, token };
	}

	// Additional methods for password reset, token refresh, etc., could also be defined here.
}

module.exports = new AuthModel();
