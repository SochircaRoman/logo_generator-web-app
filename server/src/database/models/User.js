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
    maxlength: 60,
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
    default: "https://firebasestorage.googleapis.com/v0/b/logogenerator-730da.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=2122118f-b3e8-40ff-85c5-acaabb0f4fa7",
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