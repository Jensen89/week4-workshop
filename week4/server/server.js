const express = require('express');
const cors = require('cors');   
const bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../www'));
app.use(express.json());

class User {
    constructor(username, birthdate, age, email, password) {
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.email = email;
        this.password = password;
    }
}

const users = [
    new User("john_doe", "1995-04-21", 29, "123@gmail.com", "123456"),
    new User("jane_smith", "2001-11-15", 22, "test@gmail.com", "test123"),
    new User("admin_user", "1988-01-30", 36, "admin@gmail.com", "admin123")
];

let server = http.listen(3000, function() {
 
    console.log("Server listening on port 3000");

});

//Routes
app.get('/', function(req, res) {
    res.json({ message: 'Server is running!' });
});

app.post('/api/auth', function(req, res) {
    if (!req.body || !req.body.email || !req.body.password) {
        console.log("Missing email or password");
        return res.status(400).send({ error: "Missing email or password" });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        console.log("Login successful for user:", user.username);
        
        const userResponse = {
            username: user.username,
            birthdate: user.birthdate,  
            age: user.age,
            email: user.email,
            valid: true
        };
        res.json(userResponse);

    } else {
        console.log("Login failed for email:", email);
        res.json({ valid: false });
    }  
});

