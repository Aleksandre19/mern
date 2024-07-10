const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
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

const validateAuthUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

const validateRegUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref('password'),
  });

  return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.validateAuthUser = validateAuthUser;
module.exports.validateRegUser = validateRegUser;
