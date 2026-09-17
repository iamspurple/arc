import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/generated/prisma/client";
import { Role } from "@/generated/prisma/enums";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);

	await prisma.user.upsert({
		where: {
			email: process.env.ADMIN_EMAIL!,
		},
		update: {
			role: Role.ADMIN,
		},
		create: {
			email: process.env.ADMIN_EMAIL!,
			passwordHash,
			role: Role.ADMIN,
		},
	});
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
