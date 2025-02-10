import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { connectToDatabase } from "@/lib/mongodb";
import authMiddleware from "@/Middleware/auth";

export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        // Authenticate user
        const user = await authMiddleware(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount, category, description } = await req.json();
        if (!amount || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create new expense
        const newExpense = await Expense.create({
            amount,
            category,
            description,
            userId: user.id,
        });

        return NextResponse.json({ message: "Expense added successfully", data: newExpense }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await connectToDatabase();

    try {
        // Authenticate user
        const user = await authMiddleware(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch user expenses
        const expenses = await Expense.find({ isDelete: false, userId: user.id });

        return NextResponse.json({ message: "Expenses fetched successfully", data: expenses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}
