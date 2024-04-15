const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

const { upSeed, downSeed } = require('./utils/seed')

describe('users endpoint', () => {
  let server = null
  let api = null

  beforeAll(async () => {
    server = realApp.listen(3002)
    api = request(server)
    await upSeed()
  })

  afterAll(async () => {
    server.close()
    await downSeed()
  })

  describe('GET /users', () => {
    test('get users from /users', async () => {
      const response = await api.get('/api/v1/users')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach((item) => {
        expect(typeof item).toBe('object')
      })
    })

    test('get user by id from /users/:id', async () => {
      const id = 1
      const user = await models.User.findByPk(id) // usar la base de datos para comprobar que el usuario existe vs lo que devuelve la API
      const response = await api.get('/api/v1/users/' + user.id)
      expect(response.status).toBe(200)
      expect(typeof response.body).toBe('object')
      expect(response.body.email).toBe(user.email)
    })
  })

  describe('POST /api/v1/users', () => {
    let createdUserId

    afterEach(async () => {
      if (createdUserId) {
        await api.delete(`/api/v1/users/${createdUserId}`)
        createdUserId = null
      }
    })

    test('create user in /users with invalid email', async () => {
      const body = {
        email: '---------',
        password: '123456pass'
      }
      const response = await api.post('/api/v1/users').send(body)
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: '"email" must be a valid email',
        statusCode: 400
      })
    })

    test('create user in /users', async () => {
      const body = {
        email: 'nuevo-user@mail.com',
        password: '123456pass'
      }
      const response = await api.post('/api/v1/users').send(body)
      expect(response.status).toBe(201)
      expect(typeof response.body).toBe('object')
      expect(response.body.email).toBe(body.email)
      // check in db
      const user = await models.User.findOne({
        where: { email: body.email }
      })
      expect(user.email).toBe(body.email)
      createdUserId = user.id
    })
  })
})
