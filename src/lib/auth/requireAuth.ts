import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Role } from "@/generated/prisma/enums"

export const requireAuth = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		throw new Error("UNAUTHORIZED");
	}
	return session.user;
};

export const requireRole = async (role: Role) => {
	const user = await requireAuth();
	if (user.role !== role) {
		throw new Error("FORBIDDEN");
	}
	return user;
}
