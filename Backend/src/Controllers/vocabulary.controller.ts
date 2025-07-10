import {RequestHandler} from "express";
import vocabularyModel from "../Models/vocabulary";

interface vocabularyType {
    type: string;
    input: string,
    meaning: string;
    example: string;
    synonyms?: string[];
    pronunciation?: {
        phonetic: string; // Phonetic representation of the word
        audio_url?: string; // URL to an audio file for pronunciation
    };
}

export const postVocabulary : RequestHandler<unknown,unknown,vocabularyType,unknown> = async (req, res, next) => {

    const { meaning, input, example, synonyms, pronunciation, type  } = req.body;

    console.log(req.body);

    try{

        if(!input || !meaning || !example ) {
            throw new Error("Word, definition, exampleSentence not found");
        }

        const newWord = await vocabularyModel.create({
            type: type, // Assuming a fixed type for vocabulary entries
            word : input,
            definition : meaning,
            exampleSentence : example,
            synonyms: synonyms || [], // Optional field, default to empty array if not provided
            pronunciation: {
                phonetic: pronunciation?.phonetic || '', // Default to empty string if not provided
                audio_url: pronunciation?.audio_url || null // Default to null if not provided
            }
        })

        // Here you would typically save the word to a database
        // For demonstration, we will just return the word
        res.status(201).json(newWord);

    }catch (error: unknown){
        next(error);
    }
}