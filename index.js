const express = require('express');
const app = express();
__path = process.cwd();
const PORT = process.env.PORT || 3000;

require('events').EventEmitter.defaultMaxListeners = 500;

// Import modules
const miniRoutes = require('./mini');


// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', miniRoutes);       

// mini.html
app.get('/', (req, res) => {
    res.sendFile(__path + '/mini.html');
});


// Start server
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT} `);
});

module.exports = app;