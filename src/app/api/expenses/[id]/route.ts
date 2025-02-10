import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import authMiddleware from "@/Middleware/auth";
import mongoose from "mongoose";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    await connectToDatabase();

    try {
        // Authenticate user
        const { id } = await context.params;
        const user = await authMiddleware(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid expense ID" }, { status: 400 });
        }

        const expense = await Expense.findOne({
            _id: id,
            userId: user.id,
            isDelete: false,
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Expense fetched successfully", data: expense }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    await connectToDatabase();

    try {
        // Authenticate user
        const { id } = await context.params;
        const user = await authMiddleware(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid expense ID" }, { status: 400 });
        }

        const { amount, category, description } = await req.json();

        const expense = await Expense.findOne({
            _id: id,
            userId: user.id,
            isDelete: false,
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 });
        }

        // Update fields if provided
        if (amount !== undefined) expense.amount = amount;
        if (category !== undefined) expense.category = category;
        if (description !== undefined) expense.description = description;

        await expense.save();
        return NextResponse.json({ message: "Expense updated successfully", data: expense }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    await connectToDatabase();

    try {
        // Authenticate user
        const { id } = await context.params;
        const user = await authMiddleware(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid expense ID" }, { status: 400 });
        }

        const expense = await Expense.findOne({
            _id: id,
            userId: user.id,
            isDelete: false,
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 });
        }

        expense.isDelete = true;
        await expense.save();

        return NextResponse.json({ message: "Expense deleted successfully", data: expense }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}
