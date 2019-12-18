'use strict';
var sql = require('./db.js');

var User = function(user) {
  (this.name = user.name),
    (this.email = user.email),
    (this.password = user.password),
    (this.about = user.about),
    (this.usable_points = user.usable_points),
    (this.used_points = user.used_points),
    (this.level = user.level),
    (this.cardId = user.cardId);
};

User.createUser = function(newUser, result) {
  sql.query('INSERT INTO users set ? ', newUser, function(err, res) {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    } else {
      result(null, res.insertId);
    }
  });
};

User.loginUser = function(email, result) {
  sql.query('SELECT * FROM users WHERE email = ?', [email], function(
    error,
    results
  ) {
    if (error) {
      result(error, null);
      throw err;
    } else {
      results.forEach(element => {
        result(null, element);
      });
    }
  });
};

User.getUserById = function(userId, result) {
  sql.query('Select * from users where id = ? ', userId, function(err, res) {
    if (err) {
      result(err, null);
      return;
    } else {
      res.forEach(element => {
        result(null, element);
      });
    }
  });
};

User.getUsers = function(result) {
  sql.query('Select * from users', function(err, res) {
    if (err) {
      result(null, err);
      return;
    } else {
      result(null, res);
    }
  });
};

User.updateById = function(id, user, result) {
  sql.query(
    'UPDATE users set name = ?, email = ?, password = ?, about = ?, usable_points = ?, used_points =?, level = ?, cardId = ? WHERE id = ?',
    [
      user.name,
      user.email,
      user.password,
      user.about,
      user.usable_points,
      user.used_points,
      user.level,
      user.cardId,
      id
    ],
    function(err, res) {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, res);
      }
    }
  );
};

User.remove = function(id, result) {
  sql.query('DELETE FROM users WHERE id = ?', [id], function(err, res) {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
