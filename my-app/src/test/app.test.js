const request = require('supertest');
const app = require('../app');

describe('GET /words/:id', () => {
    it('should return the number of words in the text', async () => {
        const textId = '678b3e1f55b0360d82c2ebbb';
        const response = await request(app).get(`/words/${textId}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wordCount');
        expect(typeof response.body.wordCount).toBe('number');
    });

    it('should return 404 for a non-existent text ID', async () => {
        const invalidTextId = '-------nonExistentId------';

        const response = await request(app).get(`/words/${invalidTextId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Text not found');
    });
});


