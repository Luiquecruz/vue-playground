const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./routes/tasksRoutes');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('TaskTrack API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
