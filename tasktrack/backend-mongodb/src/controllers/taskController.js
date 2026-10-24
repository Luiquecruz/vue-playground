const Task = require('../models/Task');

// GET /tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

// PUT /tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).json({message: 'Task not found'});

    res.json(task);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

// Delete /tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({message: 'Task not found'});
    res.json({message: 'Task deleted'});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};