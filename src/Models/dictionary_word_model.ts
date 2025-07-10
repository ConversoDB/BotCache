export interface Dictionary_word_model{
    type: string;
    input: string,
    meaning: string;
    example: string;
    synonyms?: string[];
    pronunciation?: {
        phonetic: string; // Phonetic representation of the word
        audio_url?: string; // URL to an audio file for pronunciation
    }; // Optional field for pronunciation
}