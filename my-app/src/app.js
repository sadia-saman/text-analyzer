const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const routes = require('./routes');
const TextRepository = require('./repositories/TextRepository');
const textAnalyzer = require('./utils/textAnalyzer');
const Redis = require('ioredis');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests, maximum 100 calls per minute is allowed"
});
const cache = new Redis({
  host: 'redis',
  port: 6379
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

mongoose.connect('mongodb://mongo:27017/text_analyzer');

app.use(bodyParser.json({ type: 'application/json', charset: 'utf-8' }));
app.use('/api', routes);
app.use('/api', limiter);

app.get('/api/texts/words/:id', async (req, res) => {
    try {
      const text = await TextRepository.findById(req.params.id);
      if (!text) {
        return res.status(404).json({ error: 'Text not found' });
      }
      const arg = `wordCount: ${req.params.id}`;
      try {
        const cachedResult = await cache.get(arg);
        logger.info(`data found in cache for API call with id ${req.params.id}`)
        if (cachedResult) {
          return res.status(200).json({ wordCount: cachedResult });
        }
      } catch (error) {
        logger.error(`data not found in cache for API call with id ${req.params.id}`)
      }
      const wordCount = textAnalyzer.countWords(text.content);
      try{
        await cache.set(arg, wordCount);
      } catch (error) {
        logger.error("Error while saving data to cache")
      }

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
    const arg = `characterCount: ${req.params.id}`;
    try {
      const cachedResult = await cache.get(arg);
      logger.info(`data found in cache for API call with id ${req.params.id}`)
      if (cachedResult) {
        return res.status(200).json({ charCount: cachedResult });
      }
    } catch (error) {
      logger.error(`data not found in cache for API call with id ${req.params.id}`)
    }
    try{
      await cache.set(arg, charCount);
    } catch (error) {
      logger.error("Error while saving data to cache")
    }
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
    const arg = `sentenceCount: ${req.params.id}`;
    try {
      const cachedResult = await cache.get(arg);
      logger.info(`data found in cache for API call with id ${req.params.id}`)
      if (cachedResult) {
        return res.json({ sentenceCount: cachedResult });
      }
    } catch (error) {
      logger.error(`data not found in cache for API call with id ${req.params.id}`)
    }

    const sentenceCount = textAnalyzer.countSentences(text.content);
    try{
      await cache.set(arg, sentenceCount);
    } catch (error) {
      logger.error("Error while saving data to cache")
    }
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
    const arg = `paragraphCount: ${req.params.id}`;
    try {
      const cachedResult = await cache.get(arg);
      logger.info(`data found in cache for API call with id ${req.params.id}`)
      if (cachedResult) {
        return res.json({ paragraphCount: cachedResult });
      }
    } catch (error) {
      logger.error(`data not found in cache for API call with id ${req.params.id}`)
    }
    const paragraphCount = textAnalyzer.countParagraphs(text.content);
    try{
      await cache.set(arg, paragraphCount);
    } catch (error) {
      logger.error("Error while saving data to cache")
    }
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
    const arg = `longest-word: ${req.params.id}`;
    try {
      const cachedResult = await cache.get(arg);
      logger.info(`data found in cache for API call with id ${req.params.id}`)
      if (cachedResult) {
        return res.json({ longestWord: cachedResult });
      }
    } catch (error) {
      logger.error(`data not found in cache for API call with id ${req.params.id}`)
    }
    const longestWord = textAnalyzer.findLongestWord(text.content);
    try{
      await cache.set(arg, longestWord);
    } catch (error) {
      logger.error("Error while saving data to cache")
    }
    res.json({ longestWord: longestWord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = app;

