const sequelize = require('../../src/db/sequelize')
const { models } = require('../../src/db/sequelize')
const bcrypt = require('bcrypt')
const fake = require('./fake')

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true }) // force: true => drop all tables and create new ones

    // create users
    const users = fake.generateManyFakes(10, fake.generateFakeUser)
    await models.User.bulkCreate(users)

    // create admin user
    await models.User.create({
      email: 'admin@mail.com',
      password: bcrypt.hashSync('admin123', 10)
    })
  } catch (error) {
    console.error(error)
  }
}

const downSeed = async () => {
  await sequelize.drop()
}

module.exports = {
  upSeed,
  downSeed
}
