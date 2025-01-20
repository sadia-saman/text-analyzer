const request = require('supertest');
const app = require('../app');
const TextRepository = require('../repositories/TextRepository');
const textAnalyzer = require('../utils/textAnalyzer');


jest.mock('../repositories/TextRepository');
jest.mock('../utils/textAnalyzer');

describe('GET /api/texts/words/:id', () => {
    it('should return the word count for a given text ID', async () => {
        const response = await request(app).get('/api/texts/words/678b3d52cdfb33278f8c0c17');
        console.log("response : ", response)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wordCount', wordCount);
    });

    it('should return 404 if text not found', async () => {
        const response = await request(app).get('/api/texts/words/nonexistent');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Text not found');
    });

    it('should return 500 if there is a server error', async () => {
        TextRepository.findById.mockRejectedValue(new Error('Server error'));

        const response = await request(app).get('/api/texts/wordsss/1');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Server error');
    });
});
