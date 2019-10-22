'use strict';
var sql = require('./db.js');

//Item object constructor
var Item = function(item) {
  this.item = item.item;
  this.status = item.status;
  this.created_at = new Date();
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
Item.getItemById = function(itemId, result) {
  sql.query('Select item from items where id = ? ', itemId, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
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
Item.updateById = function(id, item, result) {
  sql.query('UPDATE items SET item = ? WHERE id = ?', [item.item, id], function(
    err,
    res
  ) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
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
