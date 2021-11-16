const { Task, User } = require('../models/taskMod');

exports.getTasks = async (req, res) => {
  try {
    const { userID } = req.params;
    const currentUser = await User.findOne({ _id: userID });
    const allUserTasks = await Task.find({
      _id: { $in: currentUser.userTasks },
    });
    // console.log('allUserTasks', allUserTasks);
    res.send(allUserTasks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.addTask = async (req, res) => {
  const { metadata, userID } = req.body;
  try {
    const addedTask = await Task.create(metadata);
    const taskID = addedTask._id;

    res.status(201);
    res.send(addedTask);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Delete task error', error);
    res.status(500);
    res.send(error);
  }
};

exports.updateTask = async (req, res) => {
  3;
  const { id } = req.params;

  const inputReq = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, inputReq, {
      upsert: true,
    });

    res.status(201);
    res.send(updatedTask);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
