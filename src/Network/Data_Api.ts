import type {Dictionary_word_model} from "../Models/dictionary_word_model.ts";

// const API_ROUTE = "http://localhost:5000";
const API_ROUTE = "https://botcache.onrender.com";

export async function storeWord(word : Dictionary_word_model){

    console.log(word)

    const response = await fetch(`${API_ROUTE}/api/words`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })

    if(!response.ok){
        const body = await response.text().catch(() => "");
        throw new Error(`Failed to store word: ${response.status} ${body}`);
    }
}