import supertest from 'supertest';
import app from '../../index';
const request = supertest(app);
describe('Test endpoint main route response', () => {
it('tests presence of all images', async () => {
    const response = await request.get('/api/listImages');
    expect(response.status).toBe(200);
  });});