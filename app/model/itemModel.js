'use strict';
var sql = require('./db.js');

//Item object constructor
var Item = function(item) {
  (this.shopId = item.shopId),
    (this.name = item.name),
    (this.price = item.price),
    (this.image = item.image),
    (this.points = item.points),
    (this.code = item.code);
};

Item.createItem = function(newItem, result) {
  sql.query('INSERT INTO items set ?', newItem, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Item.getAllItems = function(result) {
  sql.query('Select * from items', function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('items : ', res);
      result(null, res);
    }
  });
};
Item.getItemsByShopId = function(shopId, result) {
  sql.query('Select * from items where shopId = ? ', [shopId], function(
    err,
    res
  ) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Item.updateById = function(id, item, result) {
  sql.query(
    'UPDATE items set name = ?, price = ?, image = ?, points = ?, code = ? WHERE id = ?',
    [item.name, item.price, item.image, item.points, item.code, id],
    function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Item.remove = function(id, result) {
  sql.query('DELETE FROM items WHERE id = ?', [id], function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Item;
