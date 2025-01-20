const request = require('supertest');
const app = require('../app');
const TextRepository = require('../repositories/TextRepository');
const textAnalyzer = require('../utils/textAnalyzer');


jest.mock('../repositories/TextRepository');
jest.mock('../utils/textAnalyzer');
jest.useFakeTimers()

describe('GET /api/texts/words/:id', () => {
    const textId = '678b3d52cdfb33278f8c0c17';
    const wordCount = 5;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the word count for a given text ID', async () => {
        TextRepository.findById.mockResolvedValue({ id: textId, content: 'My name is sadia Saman' });
        textAnalyzer.countWords.mockReturnValue(wordCount);
        const response = await request(app).get(`/api/texts/words/${textId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wordCount', wordCount);
    });

    it('should return 404 if text not found', async () => {
        TextRepository.findById.mockResolvedValue(null);

        const response = await request(app).get('/api/texts/words/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get(`/api/texts/words/${textId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });
});
describe('GET /api/texts/characters/:id', () => {
    const textId = '678b3d52cdfb33278f8c0c17';
    const charCount = 5;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the character count for a given text ID', async () => {
        TextRepository.findById.mockResolvedValue({ id: textId, content: 'My name is sadia Saman' });
        textAnalyzer.countCharacters.mockReturnValue(charCount);
        const response = await request(app).get(`/api/texts/characters/${textId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('charCount', charCount);
    });

    it('should return 404 if text not found', async () => {
        TextRepository.findById.mockResolvedValue(null);

        const response = await request(app).get('/api/texts/characters/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get(`/api/texts/characters/${textId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });
});

describe('GET /api/texts/sentences/:id', () => {
    const textId = '678b3d52cdfb33278f8c0c17';
    const sentenceCount = 1;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the sentence count for a given text ID', async () => {
        TextRepository.findById.mockResolvedValue({ id: textId, content: 'My name is sadia Saman' });
        textAnalyzer.countSentences.mockReturnValue(sentenceCount);
        const response = await request(app).get(`/api/texts/sentences/${textId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('sentenceCount', sentenceCount);
    });

    it('should return 404 if text not found', async () => {
        TextRepository.findById.mockResolvedValue(null);

        const response = await request(app).get('/api/texts/sentences/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get(`/api/texts/sentences/${textId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });

});

describe('GET /api/texts/paragraphs/:id', () => {
    const textId = '678b3d52cdfb33278f8c0c17';
    const paragraphCount = 1;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the paragraph count for a given text ID', async () => {
        TextRepository.findById.mockResolvedValue({ id: textId, content: 'My name is sadia Saman' });
        textAnalyzer.countParagraphs.mockReturnValue(paragraphCount);
        const response = await request(app).get(`/api/texts/paragraphs/${textId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('paragraphCount', paragraphCount);
    });

    it('should return 404 if text not found', async () => {
        TextRepository.findById.mockResolvedValue(null);

        const response = await request(app).get('/api/texts/paragraphs/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get(`/api/texts/paragraphs/${textId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });

});
describe('GET /api/texts/longest-word/:id', () => {
    const textId = '678b3d52cdfb33278f8c0c17';
    const longestWord = 1;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the longest word for a given text ID', async () => {
        TextRepository.findById.mockResolvedValue({ id: textId, content: 'My name is sadia Saman' });
        textAnalyzer.findLongestWord.mockReturnValue(longestWord);
        const response = await request(app).get(`/api/texts/longest-word/${textId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('longestWord', longestWord);
    });

    it('should return 404 if text not found', async () => {
        TextRepository.findById.mockResolvedValue(null);

        const response = await request(app).get('/api/texts/longest-word/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get(`/api/texts/longest-word/${textId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });

});


