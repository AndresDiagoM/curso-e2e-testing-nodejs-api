const request = require('supertest')

const realApp = require('../src/app')

describe('users endpoint', () => {
  let app = null
  let server = null
  let api = null

  beforeEach(() => {
    app = realApp
    server = app.listen(3002)
    api = request(server)
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
  })

  describe('POST /api/v1/users', () => {
    let body = null
    
    beforeEach(() => {
      body = {
        email: '',
        password: ''
      }
    })

    test('create user in /users with invalid email', async () => {
      body = {
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

  afterEach(() => {
    server.close()
  })
})
