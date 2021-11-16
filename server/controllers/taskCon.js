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
  const { userID } = req.params;
  const taskMetadata = req.body;
  // const taskMetadataAndUser = Object.defineProperty(taskMetadata, 'users', {
  //   value: [userID],
  // });
  taskMetadata['users'] = [userID];
  // console.log('taskMetadata', taskMetadataAndUser);
  try {
    const addedTask = await Task.create(taskMetadata);
    const taskID = addedTask._id;
    await User.findOneAndUpdate(
      { _id: userID },
      { $push: { userTasks: taskID } }
    );
    res.status(201);
    res.send(addedTask);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

exports.deleteTask = async (req, res) => {
  const { id, userID } = req.params;
  console.log('id', id);
  console.log('userID', userID);
  try {
    await Task.findByIdAndDelete(id);
    await User.findOneAndUpdate({ _id: userID }, { $pull: { userTasks: id } });
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
