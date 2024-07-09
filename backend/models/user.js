const { timeStamp } = require('console');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.MERN_JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Hash Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
