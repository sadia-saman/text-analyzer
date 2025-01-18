const TextService = require('../services/TextService');

class TextController {
  async createText(req, res) {
    const { content } = req.body;
    const text = await TextService.createText(content);
    res.status(201).json(text);
  }

  async getText(req, res) {
    const { id } = req.params;
    const text = await TextService.getTextById(id);
    res.status(200).json(text);
  }

  async updateText(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    const text = await TextService.updateText(id, content);
    res.status(200).json(text);
  }

  async deleteText(req, res) {
    const { id } = req.params;
    await TextService.deleteText(id);
    res.status(204).send();
  }

  async getAllTexts(req, res) {
    const texts = await TextService.getAllTexts();
    res.status(200).json(texts);
  }
}

module.exports = new TextController();
