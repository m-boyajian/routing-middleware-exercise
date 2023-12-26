const request = require('supertest');
const app = require('../app'); 

describe('Item Routes', () => {
  // Define a sample item for testing
  const sampleItem = { name: 'Sample Item', price: 10.99 };

  it('should get the list of items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new item', async () => {
    const response = await request(app)
      .post('/items')
      .send(sampleItem);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ added: sampleItem });
  });

  it('should get a specific item', async () => {
    const response = await request(app).get(`/items/${sampleItem.name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(sampleItem);
  });

  it('should update a specific item', async () => {
    const updatedItem = { name: 'Updated Item', price: 15.99 };
    const response = await request(app)
      .patch(`/items/${sampleItem.name}`)
      .send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
  });

  it('should delete a specific item', async () => {
    const response = await request(app).delete(`/items/${sampleItem.name}`);
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });  

  it('should handle not found error', async () => {
    const response = await request(app).get('/items/nonexistentitem');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
