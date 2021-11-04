//const BASE_URL = 'http://localhost:3001/tasks';
const BASE_URL =
  'mongodb+srv://' +
  process.env.MongoDBuser +
  ':' +
  process.env.MongoDBpass +
  '@' +
  process.env.DBcluster +
  '.vpxhl.mongodb.net/' +
  process.env.DBname;

const getTasks = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null; // I was getting error: Expected to return a value at the end of async arrow function
  }
};

const createTask = async (taskMetadata) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(taskMetadata),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};

const updateTask = async (id, updatedTask) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

export default { getTasks, createTask, deleteTask, updateTask };
