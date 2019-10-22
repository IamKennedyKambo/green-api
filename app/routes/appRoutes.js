'use strict';
module.exports = function(app) {
  var controller = require('../controller/appController');

  // controller Routes
  app
    .route('/tasks')
    .get(controller.list_all_tasks)
    .post(controller.create_a_task);

  app
    .route('/tasks/:taskId')
    .get(controller.read_a_task)
    .put(controller.update_a_task)
    .delete(controller.delete_a_task);

  //user routes
  app
    .route('/users')
    .get(controller.list_all_users)
    .post(controller.create_a_user);

  app
    .route('/users/:userId')
    .get(controller.read_a_user)
    .put(controller.update_a_user)
    .delete(controller.delete_a_user);

  //shop routes
  app
    .route('/shops')
    .get(controller.list_all_shops)
    .post(controller.create_a_shop);

  app
    .route('/shops/:shopId')
    .get(controller.read_a_shop)
    .put(controller.update_a_shop)
    .delete(controller.delete_a_shop);

  //bin routes
  app
    .route('/bins')
    .get(controller.list_all_bins)
    .post(controller.create_a_bin);

  app
    .route('/bins/:binId')
    .get(controller.read_a_bin)
    .put(controller.update_a_bin)
    .delete(controller.delete_a_bin);

  //item routes
  app
    .route('/products')
    .get(controller.list_all_products)
    .post(controller.create_a_product);

  app
    .route('/products/:productId')
    .get(controller.read_a_product)
    .put(controller.update_a_product)
    .delete(controller.delete_a_product);
};
