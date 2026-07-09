import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

export const CATEGORY_VALUES = ['Nouns', 'Verbs', 'Adjectives', 'Adverbs', 'All', 'Idioms', 'Phrases'] as const;

const vocabularySchema = new mongoose.Schema({
    type : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    word: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
    },
    category: {
        type: String,
        enum: CATEGORY_VALUES,
    },
    exampleSentence: {
        type: String,

    },
    synonyms: [{
        type: String,

    }],
    isFavourite: {
        type: Boolean,
    },
    pronunciation : {
        phonetic: {
            type: String,
        },
        audio_url: {
            type: String,
            default: null // Optional field, default to null if not provided
        }
    }
}, { timestamps: true });

type vocabulary = InferSchemaType<typeof vocabularySchema>;

export default mongoose.model<vocabulary>('Vocabulary', vocabularySchema)

