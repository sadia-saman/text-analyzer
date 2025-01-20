
function countWords(text) {
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
        .replace(/\s+/g, ' ') 
        .trim();
    return text.trim().split(/\s+/).length;
}


function countCharacters(text) {
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
        .replace(/\s+/g, ' ') 
        .trim();
    return text.replace(/\s+/g, '').length;
}


function countSentences(text) {
    const sentences = text.split(/[.!?]/).filter(sentence => sentence.trim().length > 0);
    return sentences.length;
}

function countParagraphs(text) {
    const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
    return paragraphs.length;
}

function findLongestWord(text) {
    const words = text.split(/\s+/);
    return words.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, '');
}

module.exports = {
    countWords,
    countCharacters,
    countSentences,
    countParagraphs,
    findLongestWord
};
  