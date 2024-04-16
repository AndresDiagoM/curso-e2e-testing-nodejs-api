const { CATEGORY_TABLE } = require('../models/category.model')

module.exports = {
  up: (queryInterface) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: 'Electronics',
        image: 'https://source.unsplash.com/1600x900/?electronics',
        created_at: new Date()
      },
      {
        name: 'Books',
        image: 'https://source.unsplash.com/1600x900/?books',
        created_at: new Date()
      },
      {
        name: 'Clothing',
        image: 'https://source.unsplash.com/1600x900/?clothing',
        created_at: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {})
  }
}
