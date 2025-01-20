const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const TextRepository = require('./repositories/TextRepository');
const textAnalyzer = require('./utils/textAnalyzer');

const app = express();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://mongo:27017/text_analyzer');

app.use(bodyParser.json());
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
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

