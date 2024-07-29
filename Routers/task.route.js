const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../Controllers/task.controller');
const { isLoggedIn } = require('../Middleware/auth.middleware');
// const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/',createTask);
router.get('/:userId', getTasks);

router.route('/:id')
  .put( updateTask)
  .delete(deleteTask);

module.exports = router;
