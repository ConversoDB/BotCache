import type {Dictionary_word_model} from "../Models/dictionary_word_model.ts";

const API_ROUTE = "http://localhost:5000";

export async function storeWord(word : Dictionary_word_model){

    console.log(word)

    await fetch(`${API_ROUTE}/api/words`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
}