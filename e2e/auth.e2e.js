const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

describe('Auth endpoint', () => {
  let server = null
  let api = null

  beforeAll(() => {
    server = realApp.listen(3002)
    api = request(server)
  })

  afterAll(() => {
    server.close()
  })

  describe('POST /auth/login', () => {
    const loginUser = async (email, password) => {
      const body = { email, password }
      return await api.post('/api/v1/auth/login').send(body)
    }

    test('login with invalid credentials', async () => {
      const result = await loginUser('adminAndres@mail.com', 'admin123')
      expect(result.status).toBe(401)
      expect(result.body).toEqual({
        error: 'Unauthorized',
        message: 'Unauthorized',
        statusCode: 401
      })
    })

    test('login with valid credentials', async () => {
      const user = await models.User.findOne({
        where: { email: 'admin@mail.com' }
      })
      const response = await loginUser('admin@mail.com', 'admin123')
      expect(response.status).toBe(200)
      expect(typeof response.body).toBe('object')
      expect(response.body.access_token).toBeTruthy()
      expect(response.body.user.id).toBe(user.id)
    })
  })
})
