require('dotenv').config()
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const User = require('./models/user');
const Blog = require('./models/blog');
const jwt = require('jsonwebtoken')
require('./DB/db');  // This connects to MongoDB

app.use(express.json());



/** 🔐 Token Extractor Middleware **/
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7); // removes 'Bearer '
  } else {
    request.token = null;
  }
  next();
};

app.use(tokenExtractor)

//login
app.post('/api/login', async (request, response) => {
  const { username,name, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

app.post('/api/users', async(req, res) => {
    const { username, name, password } = req.body

    if(!password || password.length<3 ){
      return res.status(400).json({ error: 'Password must be at least 3 characters long' });
    }
    //hashing password with 2^10 iterations(salt rounds)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    // 🖨️ Print user details (without passwordHash) to the console
    console.log('✅ New user added:', {
        username: savedUser.username,
        name: savedUser.name,
        id: savedUser._id.toString()
    });

    res.json(savedUser)

    
  });

  //Blogs
  app.post('/api/blogs', async (req, res) => {
  const body = req.body

  // 1. Find any user (e.g., the first one found)
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid or missing' });
  }
    const user = await User.findById(decodedToken.id)
  

  if (!user) {
    return res.status(400).json({ error: 'No users found in the database. Please create a user first.' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  // Add the blog's ID to the user's blogs array
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

//deleting a blog
app.delete('/api/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

// Route for listing all blogs directly in app.js
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// Route for listing all user directly in app.js
app.get('/api/users', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1 })

  response.json(users)
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Bloglist is running on port ${PORT}`);
});
