const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

// const { upSeed, downSeed } = require('./utils/seed')
const { upSeed, downSeed } = require('./utils/umzug')

describe('Products endpoint', () => {
  let server = null
  let api = null
  let token

  beforeAll(async () => {
    server = realApp.listen(3002)
    api = request(server)
    await upSeed()

    const response = await api
      .post('/api/v1/auth/login')
      .send({ email: 'admin@mail.com', password: 'admin123' })
    token = response.body.access_token
  })

  afterAll(async () => {
    server.close()
    await downSeed()
  })

  describe('GET /products', () => {
    test('get products from /products', async () => {
      const response = await api.get('/api/v1/products').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
      expect(response.body[0].category).toEqual(expect.any(Object))
    })

    test('get 3 products from /products with pagination', async () => {
      const response = await api
        .get('/api/v1/products?offset=0&limit=3')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
      expect(response.body.length).toBe(3)
    })

    test('get 4 products from /products with pagination', async () => {
      const response = await api
        .get('/api/v1/products?offset=0&limit=4')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
      expect(response.body.length).toBe(4)
    })
  })
})
