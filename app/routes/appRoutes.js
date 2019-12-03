'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');

  //user routes
  app
    .route('/users')
    .get(controller.list_users)
    .post(controller.create_user);

  app.route('/users/login').post(controller.login_user);

  app.route('/points/:cardId').post(controller.updateByCard);

  app
    .route('/users/:userId')
    .get(controller.get_user)
    .put(controller.update_user)
    .delete(controller.delete_user);

  //shop routes
  app
    .route('/shops')
    .get(controller.list_shops)
    .post(controller.create_a_shop);

  app
    .route('/shops/:shopId')
    .get(controller.get_a_shop)
    .put(controller.update_a_shop)
    .delete(controller.delete_a_shop);

  //bin routes
  app
    .route('/bins')
    .get(controller.list_all_bins)
    .post(controller.create_a_bin);

  app
    .route('/bins/:binId')
    .get(controller.get_a_bin)
    .put(controller.update_a_bin)
    .delete(controller.delete_a_bin);

  //item routes
  app
    .route('/products')
    .get(controller.list_products)
    .post(controller.create_a_product);

  app
    .route('/products/:productId')
    .get(controller.createCatalog)
    .put(controller.update_a_product)
    .delete(controller.delete_a_product);

  app.route('/cart/:userId').get(controller.createCart);

  app
    .route('/cart')
    .post(controller.create_entry)
    .get(controller.list_carts);

  app.route('/cart/:cartId').post(controller.delete_entry);

  app.route('/catalog/:shopId').get(controller.createCatalog);
};
