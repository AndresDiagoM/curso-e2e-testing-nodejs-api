const request = require('supertest')
const realApp = require('../src/app')
const { models } = require('../src/db/sequelize')

const { upSeed, downSeed } = require('./utils/seed')

describe('Profile endpoint', () => {
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

  describe('GET /profile', () => {
    let token

    beforeAll(async () => {
      const response = await api
        .post('/api/v1/auth/login')
        .send({ email: 'admin@mail.com', password: 'admin123' })

      token = response.body.access_token
    })

    test('get orders from /profile/my-orders', async () => {
      const response = await api
        .get('/api/v1/profile/my-orders')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual([])
    })

    test('get my-user from /profile/my-user', async () => {
      const user = await models.User.findOne({
        where: { email: 'admin@mail.com' }
      })
      const response = await api
        .get('/api/v1/profile/my-user')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(typeof response.body).toBe('object')
      expect(response.body.email).toBe(user.email)
    })
  })
})
