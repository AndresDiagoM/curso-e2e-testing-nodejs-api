const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

describe('users endpoint', () => {
  let server = null
  let api = null

  beforeAll(() => {
    server = realApp.listen(3002)
    api = request(server)
  })

  afterAll(() => {
    server.close()
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
  })
})
