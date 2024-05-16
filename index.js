// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session')({
    secret:'secret',
    resave:false,
    saveUninitialized:false
});

require('dotenv').config();

// Import model
const AdminRegister = require('./models/AdminRegister')

// Import Routes
const adminRegRoutes = require('./routes/adminRegRoutes')

// Instantiations
const app = express();
const port = 4500;

// Configurations
mongoose.connect(process.env.DATABASE, {
   useNewUrlParser:true,
   useUnifiedTopology:true, 
});
mongoose.connection
.once('open', () => {
    console.log('Mongoose connected successfully')
})
.on('error', () => {
    console.log(`Connection error: ${err, message}`)
});

app.set('view engine', 'pug'); // Set the view engine as pug
app.set('views', path.join(__dirname, 'views')); // Sets the directory for storing view templates.

// Middleware
app.use(express.static(path.join(__dirname, 'public'))) // Sets the directory for serving static files like CSS, images, etc
app.use(express.urlencoded ({extended:true}));
app.use(express.json()); // Parse body in JSON format
app.use(cors());

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(AdminRegister.createStrategy());
passport.serializeUser(AdminRegister.serializeUser());
passport.deserializeUser(AdminRegister.deserializeUser());   

// Routes
app.use('/', adminRegRoutes);

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/login.html')
// });

// // app.post('/login', (req, res) => {
// //     res.send('Successfully logged in!')
// // });

// app.post('/login', (req, res) => {
//     let lillian = req.body
//     res.json({message:'Successfully logged in', lillian})
// });

// Invalid routes
app.get('*', (req, res) => {
    res.send('404! Error loading page')
});

// Bootstrapping route
app.listen(port, () => console.log(`Listening on ${port}`));