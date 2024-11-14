import express from 'express';
import passport from 'passport';
import session from 'express-session';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = 3000;

// Set up body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',  // Use a secret key for sessions
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback', // URL that Google will redirect to
    },
    (token, tokenSecret, profile, done) => {
      // You can store user information in your database here
      // For now, we'll just pass the profile object to the session
      console.log('User profile:', profile);
      return done(null, profile);
    }
  )
);

// Serialize and deserialize the user to and from session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route to start the Google login flow
app.get('/auth/google', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/'); // If already logged in, redirect to home
  }
  return next(); // Proceed to Google OAuth flow
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google to redirect to after authentication
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),  // Redirect to home on failure
  (req, res) => {
    console.log('Authentication successful:', req.user);
    res.redirect('/');  // Redirect to home after successful login
  }
);

// Log out route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error during logout');
    }
    res.redirect('/');
  });
});

// Home route (or any other route you wish to protect)
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Welcome, ${req.user.displayName || 'User'}!</h1><a href='/logout'>Logout</a>`);
  } else {
    res.send('<h1>Welcome to Triton TurnUp!</h1><a href="/auth/google">Login with Google</a>');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});