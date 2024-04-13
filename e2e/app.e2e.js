const request = require('supertest')

const realApp = require('../src/app')

describe('GET /', () => {

  let app = null
  let server = null
  let api = null

  beforeEach(() => {
    app = realApp
    server = app.listen(3002)
    api = request(server)
  })

  it('should return message in /', async () => {
    const response = await api.get('/')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Hola mi server en express')
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  })

  afterEach(() => {
    server.close()
  })
})

