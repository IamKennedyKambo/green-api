'use strict';
var sql = require('./db.js');

var Bin = function(bin) {
  (this.latitude = bin.latitude),
    (this.longitude = bin.longitude),
    (this.fill_level = bin.fill_level);
};

Bin.createBin = function(newBin, result) {
  sql.query('INSERT INTO bins set ?', newBin, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Bin.getBinById = function(binId, result) {
  sql.query('Select * from bins where id = ? ', binId, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Bin.getAllBins = function(result) {
  sql.query('Select * from bins', function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};
Bin.updateById = function(id, bin, result) {
  sql.query(
    'UPDATE bins SET latitude = ?, longitude = ?, fill_level = ? WHERE id = ?',
    [bin.latitude, bin.longitude, bin.fill_level, id],
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
Bin.remove = function(id, result) {
  sql.query('DELETE FROM bins WHERE id = ?', [id], function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Bin;
