const { USER_TABLE } = require('../models/user.model')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    const password = 'admin123'
    const hash = bcrypt.hashSync(password, 10)
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@mail.com',
        password: hash,
        role: 'admin',
        created_at: new Date()
      },
      {
        email: 'customer1@mail.com',
        password: hash,
        role: 'customer',
        created_at: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {})
  }
}
