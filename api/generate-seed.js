const mongoose = require('mongoose');

// Строка подключения к MongoDB (поменяй на свою)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://seedUser:ZG0ZVWS7l3FFCnti@seeddb.d8duq.mongodb.net/?retryWrites=true&w=majority&appName=seedDB';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const Seed = mongoose.model('Seed', new mongoose.Schema({
  seed: String,
  timestamp: Date,
}));

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const newSeed = uuidv4();
      const seed = new Seed({
        seed: newSeed,
        timestamp: new Date(),
      });
      
      await seed.save();
      res.status(200).json({ seed: newSeed });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate seed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};