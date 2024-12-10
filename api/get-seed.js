const mongoose = require('mongoose');

// Строка подключения к MongoDB (поменяй на свою)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://seedUser:ZG0ZVWS7l3FFCnti@seeddb.d8duq.mongodb.net/?retryWrites=true&w=majority&appName=seedDB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB подключен'))
  .catch(err => console.log('Ошибка подключения:', err));

const mongoose = require('mongoose');

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
      const seed = await Seed.findOne().sort({ timestamp: -1 }).limit(1); // Получаем последний сгенерированный сид
      if (!seed) {
        return res.status(404).json({ error: 'Seed not found' });
      }
      res.status(200).json(seed);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch seed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
