const request = require('supertest')
const realApp = require('../src/app')

describe('GET /', () => {
  let server = null
  let api = null

  beforeAll(() => {
    server = realApp.listen(3002)
    api = request(server)
  })

  afterAll(() => {
    server.close()
  })

  it('should return message in /', async () => {
    const response = await api.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Hola mi server en express')
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  })

  describe('Endpoint with checkApiKey /nueva-ruta', () => {
    test('check /nueva-ruta api key in headers', async () => {
      const response = await api.get('/nueva-ruta').set('api', '79823')
      expect(response.status).toBe(200)
    })
    test('check /nueva-ruta without api key in headers', async () => {
      const response = await api.get('/nueva-ruta')
      expect(response.status).toBe(401)
    })
  })
})
