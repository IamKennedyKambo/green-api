'use strict';
var sql = require('./db.js');

//Item object constructor
var Message = function(item) {
  (this.id = item.id),
    (this.title = item.title),
    (this.content = item.content),
    (this.seen = item.seen),
    (this.image = item.image);
};

Message.createMessage = function(newItem, result) {
  sql.query('INSERT INTO news set ?', newItem, function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Message.getMessages = function(result) {
  sql.query('Select * from news', function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Message;
