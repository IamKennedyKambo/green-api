'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');

  //user routes
  app
    .route('/users')
    .get(controller.listUsers)
    .post(controller.createUser);

  app.route('/users/login').post(controller.authenticateUser);

  app.route('/points/:cardId').post(controller.updateByCard);

  app
    .route('/users/:userId')
    .get(controller.getUser)
    .put(controller.updateById)
    .delete(controller.deleteUser);

  //shop routes
  app
    .route('/shops')
    .get(controller.listShops)
    .post(controller.createShop);

  app
    .route('/shops/:shopId')
    .get(controller.getShop)
    .put(controller.updateShop)
    .delete(controller.deleteShop);

  //bin routes
  app
    .route('/bins')
    .get(controller.listBins)
    .post(controller.createBin);

  app
    .route('/bins/:binId')
    .get(controller.getBin)
    .put(controller.updateBin)
    .delete(controller.deleteBin);

  //item routes
  app
    .route('/products')
    .get(controller.listProducts)
    .post(controller.createProduct);

  app
    .route('/products/:productId')
    .get(controller.createCatalog)
    .put(controller.updateProduct)
    .delete(controller.deleteProduct);

  //Cart routes
  app.route('/carts/:userId').post(controller.createCart);

  app
    .route('/cart')
    .post(controller.createEntry)
    .get(controller.listCarts);

  app.route('/cart/:cartId').post(controller.deleteEntry);

  app.route('/catalog/:shopId').get(controller.createCatalog);

  //News routes
  app
    .route('/news')
    .get(controller.getMessages)
    .post(controller.createMessage);
};
