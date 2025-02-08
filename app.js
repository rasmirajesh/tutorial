// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;


// app.use(express.static(path.join(__dirname, 'public')));


// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
// });




// app.listen(PORT, (error) => {
//     if (!error) {
//         console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
//         console.log(`Visit : http://localhost:${PORT}/login`);
//     } else {
//         console.log("Error occurred, server can't start", error);
//     }
// });



const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('./db');  
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));  

//  user authentication
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Serve Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve Signup Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                req.session.user = user;  // Store user session
                res.send('Login successful! <a href="/logout">Logout</a>');
            } else {
                res.send('Invalid credentials');
            }
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/login`);
});



