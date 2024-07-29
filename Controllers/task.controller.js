// Controllers/task.controller.js

const Task = require('../Models/TaskModel');
const AppError = require('../Utils/error.utils'); // Assuming you have an AppError utility

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, deadline, user } = req.body;
    if(!title || !description || !status || !priority || !deadline){
        return next(new AppError("Every field is required", 400));
    }
    const task = await Task.create({ title, description, status, priority, deadline, user });
    if(!task){
        return next(new AppError("Task not created", 402));
    }
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    console.log(err);
    return next(new AppError(err.message, 500));
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const {userId} = req.params;
    console.log(userId)
    const tasks = await Task.find({ user: userId});
    console.log(tasks)
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
