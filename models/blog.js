const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  // Add a reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// ✅ EXPORT the model
module.exports = mongoose.model('Blog', blogSchema);