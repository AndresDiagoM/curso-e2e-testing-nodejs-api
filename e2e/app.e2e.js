const request = require('supertest')
const express = require('express')


describe('GET /hello', () => {

  let app = null
  let server = null
  let api = null

  beforeEach(() => {
    app = express()
    app.get('/hello', (req, res) => {
      res.status(200).json('Hello World')
    })
    server = app.listen(3002)
    api = request(server)
  })

  it('should return Hello World', async () => {
    const response = await api.get('/hello')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Hello World')
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  })

  afterAll(() => {
    server.close()
  })
})

