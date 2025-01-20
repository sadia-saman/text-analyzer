
function countWords(text) {
    text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
        .replace(/\s+/g, ' ') 
        .trim();
    return text.trim().split(/\s+/).length;
}

module.exports = {
    countWords
};
  