import supertest from 'supertest';
import app from '../../index';
const request = supertest(app);

describe('Test endpoint image route response', () => {
  it('tests resizing of an image', async () => {
    const response = await request.get(
      '/api/images?filename=santamonica&width=250&height=220'
    );
    expect(response.status).toEqual(200);
  });});