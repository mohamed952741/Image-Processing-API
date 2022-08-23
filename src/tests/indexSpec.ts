import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint main route response', () => {
  it('gets the api endpoint main route', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});