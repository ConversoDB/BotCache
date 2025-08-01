import {RequestHandler} from "express";
import vocabularyModel from "../Models/vocabulary";
import mongoose from "mongoose";

interface vocabularyType {
    type?: string;
    email? : string;
    input?: string,
    meaning?: string;
    example?: string;
    synonyms?: string[];
    pronunciation?: {
        phonetic: string; // Phonetic representation of the word
        audio_url?: string; // URL to an audio file for pronunciation
    },
    category? : string,
    isFavourite?: boolean,
    information? : string,
    topic? : string
}

export const postVocabulary : RequestHandler<unknown,unknown,vocabularyType,unknown> = async (req, res, next) => {

    const { meaning, input, example, synonyms, pronunciation, type, email, category, topic, information  } = req.body;

    console.log(req.body);

    try{

        if(!input ||  !email  ) {
            throw new Error("Word, definition, exampleSentence, email not found");
        }

        let newWord

        if(type == "word_phrase_idiom"){
            newWord = await vocabularyModel.create({
                type: type, // Assuming a fixed type for vocabulary entries
                email: email, // Email of the user adding the word
                word : input,
                definition : meaning ,
                exampleSentence : example ,
                synonyms: synonyms || [], // Optional field, default to empty array if not provided
                pronunciation: {
                    phonetic: pronunciation?.phonetic || '', // Default to empty string if not provided
                    audio_url: pronunciation?.audio_url || null // Default to null if not provided
                } ,
                category : category || 'all',
                isFavourite : false

            })
        }
        else{
            newWord = await vocabularyModel.create({
                type: type, // Assuming a fixed type for vocabulary entries
                email: email, // Email of the user adding the word
                word : input,
                definition :  information,
                isFavourite : false,
                exampleSentence : topic
            })
        }


        console.log("newWord", newWord);

        req.session.email = email; // Store the email in the session

        // Here you would typically save the word to a database
        // For demonstration, we will just return the word
        res.status(201).json(newWord);

    }catch (error: unknown){
        next(error);
    }
}

interface vocabularyIdType {
    id : mongoose.Types.ObjectId;
}

export const editVocabulary : RequestHandler<vocabularyIdType,unknown,vocabularyType,unknown> = async (req, res, next) => {

    const {id} = req.params;

    const {  isFavourite } = req.body;

    console.log(isFavourite)

    try {
        const response = await vocabularyModel.findByIdAndUpdate({_id : id},{
            $set: {
                isFavourite : isFavourite
            }
        },{new : true})

        res.status(201).json(response)

    }catch (error: unknown){
        next(error);
    }
}

interface emailType {
    email : string
}

// export const getVocabulary : RequestHandler<emailType,unknown,unknown,unknown> = async (req, res, next) => {
//
//     const  email  = req.params.email;
//
//     try{
//
//         console.log(email)
//
//         const words = await vocabularyModel.find({email : email })
//
//         // For demonstration, we will just return the word
//         res.status(200).json(words);
//
//     }catch (error: unknown){
//         next(error);
//     }
// }

export const getVocabulary : RequestHandler<emailType,unknown,unknown,unknown> = async (req, res, next) => {

    try{

        const  email  = req.params.email;

        console.log(email)

        const words = await vocabularyModel.find({email : email }).exec()

        console.log(words)

        // For demonstration, we will just return the word
        res.status(200).json(words);

    }catch (error: unknown){
        next(error);
    }
}



export const deleteVocabulary : RequestHandler<vocabularyIdType,unknown,unknown,unknown> = async (req, res, next) => {

    try{

        const { id }  = req.params;

        console.log(id)

        const word = await vocabularyModel.findByIdAndDelete({_id : id});

        console.log(word)

        // For demonstration, we will just return the word
        res.status(200).json(word);

    }catch (error: unknown){
        next(error);
    }
}

// export const getVocabularyById : RequestHandler<vocabularyIdType,unknown,unknown,unknown> = async (req, res, next) => {
//
//     try{
//
//         const { id }  = req.params;
//
//         console.log(id)
//
//         const word = await vocabularyModel.findById({_id : id})
//
//         console.log(word)
//
//         // For demonstration, we will just return the word
//         res.status(200).json(word);
//
//     }catch (error: unknown){
//         next(error);
//     }
// }