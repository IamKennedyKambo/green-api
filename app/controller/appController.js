'use strict';

var User = require('../model/userModel');
var Shop = require('../model/shopModel');
var Bin = require('../model/binModel');
var Item = require('../model/itemModel');
var Cart = require('../model/cartModel');

exports.list_users = function(req, res) {
  User.getUsers(function(err, user) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', user);
    res.send(user);
  });
};

exports.create_user = function(req, res) {
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
          return;
        } else {
          res.send({
            isSuccessful: false,
            message: `Error occured + ${err.code}`
          });
        }
      } else {
        var newUser = {
          id: user,
          name: new_user.name,
          email: new_user.email,
          password: new_user.password
        };
        res
          .status(200)
          .send({ isSuccessful: true, message: 'Success', user: newUser });
      }
    });
  }
};

exports.login_user = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.loginUser(email, function(err, user) {
    if (err) {
      // console.log("error ocurred",error);
      res.status(400).send({
        isSuccessful: false,
        message: 'error ocurred'
      });
    } else {
      if (password === user.password) {
        res.status(200).send({
          isSuccessful: true,
          message: 'Success',
          user: user
        });
      } else {
        res.status(401).send({
          isSuccessful: false,
          message: 'Wrong password, try again'
        });
      }
    }
  });
};

exports.get_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_user = function(req, res) {
  User.updateById(req.params.userId, new User(req.body), function(err, user) {
    if (err) res.send(err);
    res.status(200).send({
      isSuccessful: true,
      message: 'Success',
      user: new User(req.body)
    });
  });
};

exports.delete_user = function(req, res) {
  User.remove(req.params.userId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

//Shops
exports.list_shops = function(req, res) {
  Shop.getAllShops(function(err, shop) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', shop);
    res.status(200).send({ isSuccessful: true, shops: shop });
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

exports.get_a_shop = function(req, res) {
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
  Bin.getBins(function(err, bin) {
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

exports.get_a_bin = function(req, res) {
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
exports.list_products = function(req, res) {
  Item.getItems(function(err, item) {
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

//Cart
exports.list_carts = function(req, res) {
  Cart.getCart(function(err, item) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', item);
    res.send({ isSuccessful: true, items: item });
  });
};

exports.create_entry = function(req, res) {
  var new_item = new Cart(req.body);

  //handles null error
  if (!new_item) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide item details' });
  } else {
    Cart.createEntry(new_item, function(err, cart) {
      if (err) res.send(err);
      res.json(cart);
    });
  }
};

exports.createCart = function(req, res) {
  Cart.getCartByUserId(req.params.userId, function(err, cart) {
    if (err) res.send(err);
    res.status(200).send({ isSuccessful: true, cart: cart });
  });
};

exports.update_entry = function(req, res) {
  Cart.updateById(req.params.cartId, new Cart(req.body), function(err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
};

exports.delete_entry = function(req, res) {
  Cart.remove(req.params.cartId, function(err, cart) {
    if (err) res.send(err);
    res.json({ message: 'Cart successfully deleted' });
  });
};
