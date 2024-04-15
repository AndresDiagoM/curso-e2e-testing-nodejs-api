const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const generateFakeUser = () => {
  return {
    email: faker.internet.email(),
    // password: bcrypt.hashSync(faker.internet.password(), 10)
    password: bcrypt.hashSync('admin123', 10)
  }
}

const generateFakeCategory = () => {
  return {
    name: faker.commerce.department(),
    image: faker.image.imageUrl()
  }
}

const generateManyFakes = (n, generator) => {
  return Array.from({ length: n }, generator)
}

module.exports = {
  generateFakeUser,
  generateFakeCategory,
  generateManyFakes
}