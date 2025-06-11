<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bloglist NodeJS Project</title>
  
</head>
<body>

  <h1>📝 Bloglist API</h1>

  <p>A simple RESTful API built using <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>, designed for managing users and blog posts with authentication.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>User registration with password hashing (bcrypt)</li>
    <li>JWT-based authentication</li>
    <li>Create, list, and delete blog posts</li>
    <li>Each blog is associated with a user</li>
    <li>Token extraction middleware</li>
    <li>MongoDB + Mongoose integration</li>
    <li>Request logging with Morgan</li>
    <li>RESTful routes and JSON responses</li>
  </ul>

  <h2>📦 Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB & Mongoose</li>
    <li>JSON Web Token (JWT)</li>
    <li>bcrypt</li>
    <li>Postman</li>
    <li>dotenv</li>
  </ul>

  <h2>🔧 Installation</h2>
  <ol>
    <li><strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/its-ks/Bloglist_nodeJS.git
cd Bloglist_nodeJS</code></pre>
    </li>
    <li><strong>Install dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set up environment variables:</strong>
      <pre><code>.env</code></pre>
      <pre><code>MONGODB_URI=your_mongodb_connection_string
SECRET=your_super_secret_key</code></pre>
    </li>
    <li><strong>Start the server:</strong>
      <pre><code>npm start</code></pre>
    </li>
  </ol>

  <h2>🔐 Authentication</h2>
  <p>Login via <code>POST /api/login</code>:</p>
  <pre><code>{
  "username": "your_username",
  "password": "your_password"
}</code></pre>
  <p>Use the token in Postman:</p>
  <pre><code>Authorization: Bearer &lt;token&gt;</code></pre>

  <h2>📬 API Endpoints</h2>

  <h3>Users</h3>
  <ul>
    <li><code>POST /api/users</code> — Register a new user</li>
    <li><code>GET /api/users</code> — List all users (with blogs)</li>
  </ul>

  <h3>Login</h3>
  <ul>
    <li><code>POST /api/login</code> — Get JWT token</li>
  </ul>

  <h3>Blogs</h3>
  <ul>
    <li><code>GET /api/blogs</code> — Get all blogs</li>
    <li><code>POST /api/blogs</code> — Create new blog (token required)</li>
    <li><code>DELETE /api/blogs/:id</code> — Delete blog (creator only)</li>
  </ul>

  <h2>🧪 Testing with Postman</h2>
  <ol>
    <li>Register a user via <code>/api/users</code></li>
    <li>Login via <code>/api/login</code></li>
    <li>Use the token to test blog creation or deletion</li>
  </ol>

  <h2>📁 Folder Structure</h2>
  <pre><code>Bloglist_nodeJS/
├── models/          # Mongoose schemas
├── DB/              # DB connection
├── main.js          # Main application
├── .env
