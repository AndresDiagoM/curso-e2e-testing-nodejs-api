const request = require('supertest')
const express = require('express')
const app = express()

app.get('/hello', (req, res) => {
  res.status(200).json('Hello World')
})

const server = app.listen(3002)

const api = request(server)

describe('GET /hello', () => {
  afterAll(done => {
    server.close(done)
  })

  it('should return Hello World', async () => {
    const response = await api.get('/hello')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Hello World')
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  })
})