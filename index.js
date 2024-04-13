require('dotenv').config()
const port = process.env.PORT || 3000
const app = require('./src/app')

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
