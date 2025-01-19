import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface Params {
    id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    try {
        await connectMongoDB();
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        mongoose.disconnect();
        return NextResponse.json({ message: "Topic edited successfully" }, { status: 200 });
    } catch (error: unknown) {
        mongoose.disconnect();
        if (error instanceof Error) {
            console.error("Error updating topic:", error.message);
            return NextResponse.json({ message: "Error updating topic", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params;

    try {
        await connectMongoDB();
        const topic = await Topic.findOne({ _id: id });

        if (!topic) {
            mongoose.disconnect();
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        mongoose.disconnect();
        return NextResponse.json({ topic }, { status: 200 });
    } catch (error: unknown) {
        mongoose.disconnect();
        if (error instanceof Error) {
            console.error("Error fetching topic:", error.message);
            return NextResponse.json({ message: "Error fetching topic", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
}
