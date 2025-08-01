import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

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
        unique: true
    },
    category: {
        type: String,
        enum: ['Nouns', 'Verbs', 'Adjectives', 'Adverbs', 'All', 'Idioms', 'Phrases'],
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

