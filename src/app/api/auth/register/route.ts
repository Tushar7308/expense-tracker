import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/jwt';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const { firstName, lastName, email, password } = await req.json();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists', status: false }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            createdAt: new Date() 
        });

        const token = createToken(newUser);

        return NextResponse.json({ message: 'User created successfully', token, status: true }, { status: 201 });
    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ message: 'Server error', status: false }, { status: 500 });
    }
}
