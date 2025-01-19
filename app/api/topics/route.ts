import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    try {
        const { title, description, date, image, category } = await request.json();
        await connectMongoDB();
        await Topic.create({ title, description, date, image, category });
        mongoose.disconnect(); 
        return NextResponse.json({ message: "Successfully created a topic" }, { status: 201 });
    } catch (error: unknown) {
        mongoose.disconnect(); 
        console.error("Error creating topic:", error);
        return NextResponse.json({ message: "Error creating topic", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const topics = await Topic.find({});
        mongoose.disconnect();
        return NextResponse.json({ topics });
    } catch (error: unknown) {
        mongoose.disconnect(); 
        console.error("Error fetching topics:", error);
        return NextResponse.json({ message: "Error fetching topics", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Topic ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        const deletedTopic = await Topic.findByIdAndDelete(id);

        if (!deletedTopic) {
            mongoose.disconnect(); 
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        mongoose.disconnect(); 
        return NextResponse.json({ message: "Topic deleted successfully" });
    } catch (error: unknown) {
        mongoose.disconnect(); 
        console.error("Error deleting topic:", error);
        return NextResponse.json({ message: "Error deleting topic", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
