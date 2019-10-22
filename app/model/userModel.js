'use strict';
var sql = require('./db.js');

var User = function(user) {
  (this.id = user.id),
    (this.name = user.name),
    (this.email = user.email),
    (this.password = user.password),
    (this.date_joined = new Date()),
    (this.latitude = user.latitude),
    (this.longitude = user.longitude),
    (this.usable_points = 10),
    (this.available_points = 0),
    (this.level = 1);
};

User.createUser = function(newUser, result) {
  sql.query('INSERT INTO users set ?', newUser, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
User.getUserById = function(userId, result) {
  sql.query('Select user from users where id = ? ', userId, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
User.getAllUsers = function(result) {
  sql.query('Select * from users', function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};
User.updateById = function(id, user, result) {
  sql.query('UPDATE users SET user = ? WHERE id = ?', [user, id], function(
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
User.remove = function(id, result) {
  sql.query('DELETE FROM users WHERE id = ?', [id], function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
