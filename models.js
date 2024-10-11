const mongoose = require('mongoose');

const UserStatus = {
  UNACTIVE : 'UNACTIVE',
  ACTIVE : 'ACTIVE', 
  BANNED: 'BANNED',
  DELETED: 'DELETED'
}

const UserActivityStatus = {
  ALLOWED : 'ALLOWED',
  WAITING : 'WAITING', 
  BUSY: 'BUSY',
}

const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  TESTER: 'TESTER'
}


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  
  phone:  { type: String, required: true, unique: true },  
  email: { type: String, required: true, unique: true },  
  password: String,
  role: { type: String, enum : ['USER', 'ADMIN', 'SUPER_ADMIN', 'TESTER'] },
  status: { type: String , enum : ['UNACTIVE', 'ACTIVE', 'BANNED', 'DELETED'] }
}, {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

const   MissionStatus =  {
  DRAFT: 'DRAFT',
  ACTIVE : 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED'
}
const MissionType = {
  OWNED:'OWNED',
  MANAGED: 'MANAGED',
  MISSION_GROUP : 'MISSION_GROUP'
}

const missionSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String , enum : ['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELED'] }, // .id' },
}, {
timestamps: true,
});

const Mission = mongoose.model('Mission', missionSchema);


const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  deliveredTimestamp: Date,
  readTimestamp: Date
}, {
  timestamps: true,
  });

const Message = mongoose.model('Message', messageSchema);

const chatroomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  
  description: String,
  mission: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
  users : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  status: { type: String, enum : ['UNACTIVE', 'ACTIVE'] },
}, {
  timestamps: true,
  });

const ChatRoom = mongoose.model('ChatRoom', chatroomSchema);





 module.exports = { Mission, User, Message, ChatRoom, UserRole, UserStatus, UserActivityStatus, MissionType, MissionStatus, } 