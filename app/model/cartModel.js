'use strict';
var sql = require('./db.js');

//Cart object constructor
var Cart = function(cart) {
  (this.shopId = cart.shopId),
    (this.userId = cart.userId),
    (this.name = cart.name),
    (this.price = cart.price),
    (this.image = cart.image),
    (this.points = cart.points),
    (this.count = cart.count),
    (this.code = cart.code),
    (this.description = cart.description),
    (this.redeemed = cart.redeemed);
};

Cart.createEntry = function(newCart, result) {
  sql.query('INSERT INTO cart set ?', newCart, function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Cart.getCart = function(result) {
  sql.query('Select * from cart', function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Cart.getCartByUserId = function(userId, result) {
  sql.query('Select * from cart where userId = ? ', [userId], function(
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Cart.updateById = function(id, cart, result) {
  sql.query(
    'UPDATE cart set name = ?, price = ?, image = ?, points = ?, count = ?, code = ?, description = ? WHERE id = ?',
    [
      cart.name,
      cart.price,
      cart.image,
      cart.points,
      cart.count,
      cart.code,
      cart.description,
      cart.redeemed,
      id
    ],
    function(err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Cart.remove = function(id, result) {
  sql.query('DELETE FROM cart WHERE id = ?', [id], function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Cart;
