const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 3
  },
  // Add a field to store an array of blog IDs created by this user
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' // This refers to the Blog model
    }
  ]
})

// ✅ EXPORT the model
module.exports = mongoose.model('User', userSchema);