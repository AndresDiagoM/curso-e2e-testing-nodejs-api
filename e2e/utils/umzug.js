const { Umzug, SequelizeStorage } = require('umzug')
const sequelize = require('../../src/db/sequelize')
const { models } = require('../../src/db/sequelize')

const umzug = new Umzug({
  migrations: {
    glob: 'src/db/seeders/*.js',
    path: 'src/db/seeders',
    params: [sequelize.getQueryInterface(), sequelize.constructor, models]
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined
})

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true }) // force: true => drop all tables and create new ones
    await umzug.up()
    // umzug up uses all the seeders in src/db/seeders
  } catch (error) {
    console.error(error)
  }
}

const downSeed = async () => {
  // await umzug.down()
  await sequelize.drop() // drop all tables
}

module.exports = {
  upSeed,
  downSeed
}