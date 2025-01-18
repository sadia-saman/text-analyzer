const Text = require('../models/Text');

class TextRepository {
  async create(text) {
    return await Text.create(text);
  }

  async findById(id) {
    return await Text.findById(id);
  }

  async update(id, newText) {
    return await Text.findByIdAndUpdate(id, { content: newText }, { new: true });
  }

  async delete(id) {
    await Text.findByIdAndDelete(id);
  }

  async findAll() {
    return await Text.find();
  }
}

module.exports = new TextRepository();
