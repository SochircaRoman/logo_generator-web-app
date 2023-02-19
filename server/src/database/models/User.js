const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 256,
  },
  profilePic: {
    type: String,
    required: false,
    default: "",
  },
  adminRoot: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: false,
  },
  activationLink: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema)