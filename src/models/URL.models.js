import mongoose from "mongoose";

const URLSchema = new mongoose.Schema(
    {

        originalURL :{
            type: String,
            required: [true , 'URL is required']
        },

        shortURL :{
            type: String,
            unique: true,
            required: true

        }

    },
    { timestamps: true }
)

export const Url = mongoose.model("Url",URLSchema)