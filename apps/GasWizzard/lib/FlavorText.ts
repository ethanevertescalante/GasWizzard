import { loremIpsum } from "lorem-ipsum";

export const headerText : string = loremIpsum({
    count: 1,                // Number of words, sentences, or paragraphs.
    format: "plain",         // "plain" or "html".
    paragraphLowerBound: 3,  // Minimum sentences per paragraph.
    paragraphUpperBound: 7,  // Maximum sentences per paragraph.
    random: Math.random,     // PRNG function.
    sentenceLowerBound: 5,   // Minimum words per sentence.
    sentenceUpperBound: 15,  // Maximum words per sentence.
    suffix: "\n",            // Line ending for paragraphs.
    units: "paragraphs",      // "words", "sentences", or "paragraphs".
});