const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

// const { upSeed, downSeed } = require('./utils/seed')
const { upSeed, downSeed } = require('./utils/umzug')

describe('Category endpoint', () => {
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

  describe('GET /categories', () => {
    test('get categories from /categories', async () => {
      const response = await api.get('/api/v1/categories').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
    })
  })

  describe('POST /categories', () => {
    test('create category in /categories', async () => {
      const body = {
        name: 'Computers',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
      const response = await api
        .post('/api/v1/categories')
        .send(body)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(201)
      expect(typeof response.body).toBe('object')
      expect(response.body.name).toBe(body.name)
      const category = await models.Category.findByPk(response.body.id)
      expect(category.name).toBe(body.name)
    })
    test('should return 400 if name is missing', async () => {
      const body = {
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
      const response = await api
        .post('/api/v1/categories')
        .send(body)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: '"name" is required',
        statusCode: 400
      })
    })
    test('should return 401 unauthorized', async () => {
      const body = {
        name: 'Computers',
        image: 'https://api.lorem.space/image/game?w=150&h=220'
      }
      const response = await api
        .post('/api/v1/categories')
        .send(body)

      expect(response.status).toBe(401)
    })
  })
})
