// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', TaskSchema);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// server.js

// ... (previous code)

// API endpoint to get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to add a task
app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Task text is required' });
  }

  try {
    const newTask = new Task({ text });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ... (remaining code)
