const express = require('express');
const bodyParser = require('body-parser');
const chocolateRoutes = require('./routes/chocolateRoutes');
const cartRoutes = require('./routes/cartRoutes');
const factoryRoutes = require('./routes/factoryRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');


const app = express();
const port = 3000;  // Or any other port you prefer

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Map routes
app.use('/api/chocolates', chocolateRoutes);
app.use('/api/carts', cartRoutes); 
app.use('/api/factories', factoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });