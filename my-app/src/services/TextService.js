const TextRepository = require('../repositories/TextRepository');

class TextService {
  async createText(content) {
    const text = { content };
    return await TextRepository.create(text);
  }

  async getTextById(id) {
    return await TextRepository.findById(id);
  }

  async updateText(id, newText) {
    return await TextRepository.update(id, newText);
  }

  async deleteText(id) {
    await TextRepository.delete(id);
  }

  async getAllTexts() {
    return await TextRepository.findAll();
  }
}

module.exports = new TextService();
