const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date ()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date ()
        }
    ],
    login: [
        {
        id: '987',
        hash: '',
        email: 'john@gmail.com'
    }]
}

app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
     res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    database.users.push({           //.push to add to the users array
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date ()
    })
    res.json(database.users[database.users.length-1])   //grabs the last item-user in the array
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;  //this var default to false will get updated with true- "let" because we reassign it
    database.users.forEach(user => {
        if (user.id === id) {  //user.id is what we get from DB = the id received from the params
            found = true;
            return res.json(user);  //once we find the user, no need to keep looping so we need to return the user
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;  
    database.users.forEach(user => {
        if (user.id === id) {  
            found = true;
            user.entries++   //we want the entries to increase
            return res.json(user.entries);   //
        } 
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})
    

