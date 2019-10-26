'use strict';

var User = require('../model/userModel');
var Shop = require('../model/shopModel');
var Bin = require('../model/binModel');
var Item = require('../model/itemModel');

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
      message: 'Please provide all credentials'
    });
  } else {
    User.createUser(new_user, function(err, user) {
      if (err) {
        if (err.code == 'ER_DUP_ENTRY') {
          res.send({
            isSuccessful: false,
            message: 'Email exists try a different one'
          });
        } else {
          res.send({
            isSuccessful: false,
            message: `Error occured + ${err.code}`
          });
        }
      } else {
        res
          .status(200)
          .send({ isSuccessful: true, message: 'Success', user: new_user });
      }
    });
  }
};

exports.login_a_user = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.loginUser(email, password, function(err, user) {
    if (err) {
      res.send({ message: `Error + ${err.code}` });
    } else {
      res
        .status(200)
        .send({ isSuccessful: true, message: 'Success', user: user });
    }
  });
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
    res.status(200).send({isSuccessful: true, shops: shop});
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
    if (err) {
      res.send(err);
    } else {
      console.log('res', bin);
      res.status(200).send({ isSuccessful: true, bins: bin });
    }
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
    res.send({ isSuccessful: true, items: item });
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

exports.createCatalog = function(req, res) {
  Item.getItemsByShopId(req.params.shopId, function(err, item) {
    if (err) res.send(err);
    res.status(200).send({ isSuccessful: true, items: item });
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
