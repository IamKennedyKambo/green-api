'use strict';
var sql = require('./db.js');

var User = function(user) {
  (this.name = user.name),
    (this.email = user.email),
    (this.password = user.password),
    (this.about = user.about),
    (this.latitude = user.latitude),
    (this.longitude = user.longitude),
    (this.usable_points = user.usable_points),
    (this.available_points = user.available_points),
    (this.level = user.level),
    (this.cardId = user.cardId);
};

User.createUser = function(newUser, result) {
  sql.query('INSERT INTO users set ? ', newUser, function(err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.loginUser = function(email, password, result) {
  sql.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        res.end;
      } else {
        console.log(res.insertId);
        res.forEach(element => {
          result(null, element);
        });
      }
    }
  );
};
User.getUserById = function(userId, result) {
  sql.query('Select * from users where id = ? ', userId, function(err, res) {
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
      console.log('users : ', res);

      result(null, res);
    }
  });
};

User.updateById = function(id, user, result) {
  sql.query(
    'UPDATE users set name = ?, email = ?, password = ?, latitude = ?, longitude = ?, usable_points = ?, available_points =?, level = ?, cardId = ? WHERE id = ?',
    [
      user.name,
      user.email,
      user.password,
      user.latitude,
      user.longitude,
      user.usable_points,
      user.available_points,
      user.level,
      user.cardId,
      id
    ],
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
