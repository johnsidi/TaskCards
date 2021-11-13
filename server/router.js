const router = require('express').Router();

const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

const tasks = require('./controllers/taskCon');

router.get('/tasks', tasks.getTasks);
router.post('/tasks', tasks.addTask);
router.delete('/tasks/:id', tasks.deleteTask);
router.put('/tasks/:id', tasks.updateTask);

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;
