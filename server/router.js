const router = require('express').Router();

const tasks = require('./controllers/taskCon');

router.get('/tasks', tasks.getTasks);
router.post('/tasks', tasks.addTask);
router.delete('/tasks/:id', tasks.deleteTask);

module.exports = router;
