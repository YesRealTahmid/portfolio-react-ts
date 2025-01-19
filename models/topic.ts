import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Topic model
interface ITopic extends Document {
    title: string;
    description: string;
    category: string;
    date?: string; // Optional field
    image?: string; // Optional field
}

// Define the Topic schema
const TopicSchema = new Schema<ITopic>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: String, required: false },
        image: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

// Define the Topic model with the ITopic interface
const Topic = mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);

export default Topic;
