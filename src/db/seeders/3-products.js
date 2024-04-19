const { PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  up: (queryInterface) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Laptop',
        description: 'A laptop is a computer that is portable and suitable for use while traveling.',
        price: 1000,
        image: 'https://source.unsplash.com/1600x900/?laptop',
        category_id: 1,
        created_at: new Date()
      },
      {
        name: 'Smartphone',
        description: 'A smartphone is a mobile device that combines cellular and mobile computing functions into one unit.',
        price: 500,
        image: 'https://source.unsplash.com/1600x900/?smartphone',
        category_id: 1,
        created_at: new Date()
      },
      {
        name: 'shirt',
        description: 'A shirt is a cloth garment for the upper body.',
        price: 20,
        image: 'https://source.unsplash.com/1600x900/?shirt',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'shoes',
        description: 'A shoe is an item of footwear intended to protect and comfort the human foot.',
        price: 50,
        image: 'https://source.unsplash.com/1600x900/?shoes',
        category_id: 3,
        created_at: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    if(queryInterface.context) {
      queryInterface = queryInterface.context
    }
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {})
  }
}
