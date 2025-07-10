import mongoose from "mongoose";
import {InferSchemaType} from "mongoose";

const vocabularySchema = new mongoose.Schema({
    type : {
        type: String,
        required: true,
    },
    word: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
        unique: true
    },
    // partOfSpeech: {
    //     type: String,
    //     enum: ['noun', 'verb', 'adjective', 'adverb'],
    //     required: true
    // },
    exampleSentence: {
        type: String,

    },
    synonyms: [{
        type: String,

    }],
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

