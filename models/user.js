// Reequire mongoose and bcrypt for connection and encryption.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create a new Schema and add the following inheritants.
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        const err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      // checking passwords to see if they match.
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


const User = mongoose.model('User', UserSchema);
// to the moon !
module.exports = User;