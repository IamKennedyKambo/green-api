'use strict';

var Task = require('../model/taskModel');
var User = require('../model/userModel');
var Shop = require('../model/shopModel');
var Bin = require('../model/binModel');
var Item = require('../model/itemModel');

exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', task);
    res.send(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);

  //handles null error
  if (!new_task.task || !new_task.status) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide task/status' });
  } else {
    Task.createTask(new_task, function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
  }
};

exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove(req.params.taskId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.list_all_users = function(req, res) {
  User.getAllUsers(function(err, user) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', user);
    res.send(user);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);

  //handles null error
  if (!new_user || !new_user.email || !new_user.password) {
    res.status(400).send({
      isSuccessfull: false,
      message: 'Please provide name/email/password'
    });
  } else {
    User.createUser(new_user, function(err, user) {
      if (err) res.send({ isSuccessfull: false, message: 'Error occured' });
      res
        .status(200)
        .send({ isSuccessful: true, message: 'Success', user: new_user });
    });
  }
};

exports.read_a_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, res) {
  User.updateById(req.params.userId, new User(req.body), function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
  User.remove(req.params.userId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

//Shops
exports.list_all_shops = function(req, res) {
  Shop.getAllShops(function(err, shop) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', shop);
    res.send(shop);
  });
};

exports.create_a_shop = function(req, res) {
  var new_shop = new Shop(req.body);

  //handles null error
  if (!new_shop.name || !new_shop.latitude || new_shop.longitude) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide name/location' });
  } else {
    Shop.createShop(new_shop, function(err, shop) {
      if (err) res.send(err);
      res.json(shop);
    });
  }
};

exports.read_a_shop = function(req, res) {
  Shop.getShopById(req.params.shopId, function(err, shop) {
    if (err) res.send(err);
    res.json(shop);
  });
};

exports.update_a_shop = function(req, res) {
  Shop.updateById(req.params.shopId, new Shop(req.body), function(err, shop) {
    if (err) res.send(err);
    res.json(shop);
  });
};

exports.delete_a_shop = function(req, res) {
  Shop.remove(req.params.shopId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Shop successfully deleted' });
  });
};

//Bins
exports.list_all_bins = function(req, res) {
  Bin.getAllBins(function(err, bin) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', bin);
    res.send(bin);
  });
};

exports.create_a_bin = function(req, res) {
  var new_bin = new Bin(req.body);

  //handles null error
  if (!new_bin.latitude || !new_bin.longitude) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide bin location' });
  } else {
    Bin.createBin(new_bin, function(err, bin) {
      if (err) res.send(err);
      res.json(bin);
    });
  }
};

exports.read_a_bin = function(req, res) {
  Bin.getBinById(req.params.binId, function(err, bin) {
    if (err) res.send(err);
    res.json(bin);
  });
};

exports.update_a_bin = function(req, res) {
  Bin.updateById(req.params.binId, new Bin(req.body), function(err, bin) {
    if (err) res.send(err);
    res.json(bin);
  });
};

exports.delete_a_bin = function(req, res) {
  Bin.remove(req.params.binId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Bin successfully deleted' });
  });
};

//Products
exports.list_all_products = function(req, res) {
  Item.getAllItems(function(err, item) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', item);
    res.send(item);
  });
};

exports.create_a_product = function(req, res) {
  var new_item = new Item(req.body);

  //handles null error
  if (!new_item.latitude || !new_item.longitude) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide item location' });
  } else {
    Item.createItem(new_item, function(err, item) {
      if (err) res.send(err);
      res.json(item);
    });
  }
};

exports.read_a_product = function(req, res) {
  Item.getItemById(req.params.itemId, function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.update_a_product = function(req, res) {
  Item.updateById(req.params.itemId, new Item(req.body), function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.delete_a_product = function(req, res) {
  Item.remove(req.params.itemId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};
