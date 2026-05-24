const Todo = require('../models/Todo');

exports.getAll = async (req, res, next) => {
  try {
    const { completed, priority } = req.query;
    const filter = { user: req.user.id };
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const todo = await Todo.create({
      user: req.user.id,
      title,
      description: description || '',
      priority: priority || 'medium',
    });
    res.status(201).json(todo);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) { next(err); }
};
