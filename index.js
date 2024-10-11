

const  express  = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))  
app.use(cors()) 

//const { v4: uuidv4 } = require('uuid');
//const { default: axios } = require('axios');


//const { Message, User, Mission } = require('./models');
//const appRouter = require('express').Router();
const { create } = require('domain');
const router = require('./routes');
app.use('/api', router);

const port = 3333
const { User } = require('./models');
/*const sqlite3 = require('sqlite3').verbose(); //'sqlite3' 
sqlite3.verbose();
const db = new sqlite3.Database(':memory:');
*/
// const allowCors = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// }

// app.use(allowCors);




const  resetDb = 0
const  createAdmin = 0
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    mongoose.connect('mongodb://127.0.0.1:27017/oddjobs')
    .then(async () => {
        console.log('ok connected to db') ;
        if (resetDb) {
            console.log('reset db') ;
            await mongoose.connection.db.dropDatabase()
            console.log('dropped db') ;
        }
        if (createAdmin) {
            const admin = new User({ "username": "admin", "phone": "1234567890", "email": "admin@example.com", "password": "admin" ,"role": "ADMIN" });
            console.log('inserting admin') ;    
            console.log("admin inserted successfully");
            await admin.save()
        }
        const users = await User.find()
        console.log(users);
    })
    .catch((err) => {
        console.log(err)
    })
})
