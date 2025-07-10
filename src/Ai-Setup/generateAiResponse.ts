import {GoogleGenAI} from "@google/genai";
import {SYSTEM_PROMPT} from "../Constants/prompt.ts";
import type {Dictionary_word_model} from "../Models/dictionary_word_model.ts";
import {storeWord} from "../Network/Data_Api.ts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {type Dispatch , type SetStateAction } from "react";
import type {Content } from "../Components/ContentPage.tsx";


export async function generateAiResponse({contents} : {contents : string})  {

    console.log(contents)

    // Check if the Google API key is available
    if(!import.meta.env.VITE_GOOGLE_API_KEY) return

    // Configure the client
    const ai = new GoogleGenAI({apiKey : import.meta.env.VITE_GOOGLE_API_KEY})

    // Define the grounding tool
    const groundingTool = {
        googleSearch: {},
        name: "googleSearch",
        description: "Searches the web for information to ground the response. Use this tool to find definitions, examples, and synonyms for words.",
        // inputSchema: {
        //     type: "object",
        //     properties: {
        //         query: {
        //             type: "string",
        //             description: "The word or phrase to search for"
        //         },
        //         maxResults: {
        //             type: "integer",
        //             description: "The maximum number of results to return",
        //             default: 5
        //         }
        //     },
        //     required: ["query"]
        // },
        // outputSchema: {
        //     type: "object",
        //     properties: {
        //         Meaning: {
        //             type: "string",
        //             description: "Brief summary of the search results"
        //         },
        //         Pronunciation: {
        //             type: "any",
        //             description: "Pronunciation from the search"
        //         },
        //         Example: {
        //             type: "string",
        //             description: "Example sentence using the word"
        //         },
        //         Synonyms: {
        //             type: "array",
        //             items: {
        //                 type: "string"
        //             },
        //             description: "Synonym of the word"
        //         }
        //     },
        //     required: ["Meaning", "Example"]
        // }
    };

    // Configure generation settings
    const config = {
        tools: [groundingTool],
        thinkingConfig: {
            thinkingBudget: -1,
        },
        // responseMimeType: "application/json" ,
        systemInstruction : [
            {
                role: "system",
                text: SYSTEM_PROMPT
            }
        ]
    };

    const contnetns = [
        {
            role: "user",
            text: contents
        }
    ]

    // Make the request
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contnetns,
        config
        // groundingTools: [groundingTool],
        // maxOutputTokens: 1000,
    });

    if(!response.text) return

    const responseText = JSON.parse(response.text.substring(response.text.indexOf("{"),response.text.lastIndexOf("}")+1));


    await storeWord (responseText as Dictionary_word_model)

    return JSON.parse ( responseText ) as Dictionary_word_model;

}


export async function chatBot({contents, history} : {contents : string, history : Content[], setResult? : Dispatch<SetStateAction<any>>}) {

    // Check if the Google API key is available
    if(!import.meta.env.VITE_GOOGLE_API_KEY) return

    // Configure the client
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY)

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let resp = []

    console.log("history : " + JSON.stringify(history, null, 2))

    const propmt = `You are a helpful assistant. Please provide a detailed but brief response to the following query: ${contents}`;

    console.log("prompt" + propmt)

    const chat = model.startChat({

        // history:  [
        //     // Example initial messages (optional):
        //     {
        //       role: "user",
        //       parts: [{ text : contents }],
        //     },
        //     {
        //       role: "model",
        //       parts: [{ text: "Hello! How can I assist you today?" }],
        //     },
        // ],
        history : history,
        generationConfig: {
            // temperature: 0.7,
            maxOutputTokens: 4096,
            // Don't use responseMimeType with tools
        },
    });

    resp = await chat.getHistory()

    console.log(resp)

        let text : any


        try {
            // Send the system prompt only once at the beginning
            // await chat.sendMessage(SYSTEM_PROMPT);
            const result = await chat.sendMessage(propmt);
            const response =  result.response;
            text = response.text();
            console.log("Bot:", text);
            // history.push({role : "model", parts : [text]})
            return text

        } catch (error) {
            console.error("Error communicating with Gemini:", error);
            // Optionally, log the full chat history for debugging
            // console.log("Current Chat History:", chat.history);
        }
    // }


}


