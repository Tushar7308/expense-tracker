import { verifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export default async function authMiddleware(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        return decoded ? { id: decoded.userId } : null;
    } catch (error) {
        return null;
    }
}
