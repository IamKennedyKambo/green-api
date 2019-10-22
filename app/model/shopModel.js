'use strict';
var sql = require('./db.js');

var Shop = function(shop) {
  (this.id = shop.id),
    (this.name = shop.name),
    (this.logo = shop.logo),
    (this.latitude = shop.latitude),
    (this.latitude = shop.latitude);
};

Shop.createShop = function(newShop, result) {
  sql.query('INSERT INTO shops set ?', newShop, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Shop.getShopById = function(shopId, result) {
  sql.query('Select shop from shops where id = ? ', shopId, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Shop.getAllShops = function(result) {
  sql.query('Select * from shops', function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};

Shop.updateById = function(id, shop, result) {
  sql.query('UPDATE shops SET shop = ? WHERE id = ?', [shop, id], function(
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

Shop.remove = function(id, result) {
  sql.query('DELETE FROM shops WHERE id = ?', [id], function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Shop;
