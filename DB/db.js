const mongoose = require('mongoose')

const mongoUrl = "mongodb+srv://tbxd6342:RrB5Wb35Co0A4Xw6@cluster0.bwu71np.mongodb.net/bloglist?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB server'); 
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});


module.exports = db;
