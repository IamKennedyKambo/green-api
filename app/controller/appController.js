'use strict';

var User = require('../model/userModel');
var Shop = require('../model/shopModel');
var Bin = require('../model/binModel');
var Item = require('../model/itemModel');
var Cart = require('../model/cartModel');
var Message = require('../model/NewsModel');

exports.listUsers = function(req, res) {
  User.getUsers(function(err, user) {
    if (err) res.send(err);
    res.send(user);
  });
};

exports.createUser = function(req, res) {
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

exports.authenticateUser = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.loginUser(email, function(err, user) {
    if (err) {
      res.status(400).send({
        isSuccessful: false,
        message: `error ocurred + ${err.code}`
      });
      res.end();
    } else {
      if (password === user.password) {
        res.status(200).send({
          isSuccessful: true,
          message: 'Success',
          user: user
        });
        res.end();
      } else {
        res.status(401).send({
          isSuccessful: false,
          message: 'Wrong password, try again'
        });
        res.end();
      }
    }
  });
};

exports.getUser = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err) res.send(err);
    res.status(200).send({
      isSuccessful: true,
      message: 'Success',
      user: user
    });
  });
};

exports.updateById = function(req, res) {
  User.updateById(req.params.userId, new User(req.body), function(err, user) {
    if (err) {
      res.status(400).send({
        isSuccessful: false,
        message: err
      });
    } else {
      User.getUserById(req.params.userId, function(err, user) {
        if (err) res.send(err);
        res.status(200).send({
          isSuccessful: true,
          message: 'Success',
          user: user
        });
      });
    }
  });
};

exports.updateByCard = function(req, res) {
  var points = req.body.points;
  var cardId = req.params.cardId;
  User.updateByCard(cardId, points, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({
        isSuccessful: true,
        user: user
      });
    }
  });
};

var editUser = function(user, points) {
  var newUser = user;
  for (var i = 0; i < newUser.length; ++i) {
    var inc = newUser[i]['usable_points'];
    newUser[i]['usable_points'] = inc + points;
  }
  return newUser;
};

exports.deleteUser = function(req, res) {
  User.remove(req.params.userId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

//Shops
exports.listShops = function(req, res) {
  Shop.getAllShops(function(err, shop) {
    if (err) res.send(err);
    res.status(200).send({ isSuccessful: true, shops: shop });
  });
};

exports.createShop = function(req, res) {
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

exports.getShop = function(req, res) {
  Shop.getShopById(req.params.shopId, function(err, shop) {
    if (err) res.send(err);
    res.json(shop);
  });
};

exports.updateShop = function(req, res) {
  Shop.updateById(req.params.shopId, new Shop(req.body), function(err, shop) {
    if (err) res.send(err);
    res.json(shop);
  });
};

exports.deleteShop = function(req, res) {
  Shop.remove(req.params.shopId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Shop successfully deleted' });
  });
};

//Bins
exports.listBins = function(req, res) {
  Bin.getBins(function(err, bin) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ isSuccessful: true, bins: bin });
    }
  });
};

exports.createBin = function(req, res) {
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

exports.getBin = function(req, res) {
  Bin.getBinById(req.params.binId, function(err, bin) {
    if (err) res.send(err);
    res.json(bin);
  });
};

exports.updateBin = function(req, res) {
  Bin.updateById(req.params.binId, new Bin(req.body), function(err, bin) {
    if (err) res.send(err);
    res.json(bin);
  });
};

exports.deleteBin = function(req, res) {
  Bin.remove(req.params.binId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Bin successfully deleted' });
  });
};

//Products
exports.listProducts = function(req, res) {
  Item.getItems(function(err, item) {
    if (err) res.send(err);
    res.send({ isSuccessful: true, items: item });
  });
};

exports.createProduct = function(req, res) {
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

exports.updateProduct = function(req, res) {
  Item.updateById(req.params.itemId, new Item(req.body), function(err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.deleteProduct = function(req, res) {
  Item.remove(req.params.itemId, function(err, task) {
    if (err) res.send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};

//Cart
exports.listCarts = function(req, res) {
  Cart.getCart(function(err, item) {
    if (err) res.send(err);
    res.send({ isSuccessful: true, items: item });
  });
};

exports.createEntry = function(req, res) {
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

exports.updateEntry = function(req, res) {
  Cart.updateById(req.params.cartId, new Cart(req.body), function(err, cart) {
    if (err) res.send(err);
    res.json(cart);
  });
};

exports.deleteEntry = function(req, res) {
  Cart.remove(req.params.cartId, function(err, cart) {
    if (err) {
      res.send(err);
    } else {
      Cart.getCartByUserId(req.params.userId, function(err, updated) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send({
            isSuccessful: true,
            cart: updated
          });
        }
      });
    }
  });
};

//News
exports.createMessage = function(req, res) {
  Message.createMessage(req.body, function(err, message) {
    if (err) res.send(err);
    res.status(200).send({
      isSuccessful: true,
      message: message
    });
  });
};

exports.getMessages = function(req, res) {
  Message.getMessages(function(err, news) {
    if (err) res.send(err);
    res
      .status(200)
      .send({ isSuccessful: true, news: news, message: 'Success' });
  });
};
