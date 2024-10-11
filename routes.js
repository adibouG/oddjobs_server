const Models = require('./models');
const router = require('express').Router();

const { Message, User, Mission, ChatRoom } = Models; 

const sendMessage = async (req, res) => {
  const message = new Message(req.body);
  try {
    await message.save();
    res.send(message);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.send(messages);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404).send({ message: 'Message not found' });
    } else {
      res.send(message);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const createMission = async (req, res) => {
  const mission = new Mission(req.body);
//  const admin = await User.findOne({ username: 'admin' });
  console.log(mission);
 // mission.creator = admin._id;
  try {
    await mission.save();
    res.send(mission);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    console.log(missions);
    res.send(missions);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      res.status(404).send({ message: 'Mission not found' });
    } else {
      res.send(mission);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(mission);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndRemove(req.params.id);
    res.send({ message: 'Mission deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const  userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      console.log(user);
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};

const  getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


const  updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
};

router.post('/login', userLogin);
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/missions',createMission);
router.get('/missions', getMissions);
router.get('/missions/:id',getMission);
router.put('/missions/:id', updateMission);
router.delete('/missions/:id',deleteMission);


router.post('/messages', sendMessage);
router.get('/messages', getMessages );
router.get('/messages/:id', getMessage );
// router.put('/messages/:id', updateMessage);
// router.delete('/messages/:id', deleteMessage);

const models = [
  { 'Message' : Message.schema.obj},
  { 'User' : {...User.schema.obj}}, 
  { 'Mission' : {...Mission.schema.obj}},
]   
console.log(models);
router.get('/models', (req, res) => {
  res.send( models );
});


module.exports = router;


/*
POST /users with JSON body: { "username": "johnDoe", "email": "johndoe@example.com", "password": "password123" }
POST /missions with JSON body: { "title": "Mission 1", "description": "This is a sample mission", "creator": " ObjectId("...") }
POST /messages with JSON body: { "sender": "ObjectId("...")", "recipient": "ObjectId("...")", "message": "Hello, how are you?" }
*/