const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const TextRepository = require('./repositories/TextRepository');
const textAnalyzer = require('./utils/textAnalyzer');

const app = express();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://mongo:27017/text_analyzer');

app.use(bodyParser.json({ type: 'application/json', charset: 'utf-8' }));
app.use('/api', routes);

app.get('/api/texts/words/:id', async (req, res) => {
    try {
      const text = await TextRepository.findById(req.params.id);
      if (!text) {
        return res.status(404).json({ error: 'Text not found' });
      }
  
      const wordCount = textAnalyzer.countWords(text.content);
      res.status(200).json({ wordCount: wordCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/api/texts/characters/:id', async (req, res) => {
  try {
    const text = await TextRepository.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }

    const charCount = textAnalyzer.countCharacters(text.content);
    res.status(200).json({ charCount: charCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/texts/sentences/:id', async (req, res) => {
  try {
    const text = await TextRepository.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }

    const sentenceCount = textAnalyzer.countSentences(text.content);
    res.json({ sentenceCount:sentenceCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/texts/paragraphs/:id', async (req, res) => {
  try {
    const text = await TextRepository.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }

    const paragraphCount = textAnalyzer.countParagraphs(text.content);
    res.json({ paragraphCount: paragraphCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/texts/longest-word/:id', async (req, res) => {
  try {
    const text = await TextRepository.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }

    const longestWord = textAnalyzer.findLongestWord(text.content);
    res.json({ longestWord:longestWord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

