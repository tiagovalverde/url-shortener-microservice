const mongoose = require('mongoose');

// switch callbacks by promises
mongoose.Promise = Promise;  


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', () => {
    console.log('Database connection failed');
});
mongoose.connection.once('open', () =>  {
    console.log('Database connection successful');
});

module.exports = {mongoose}; 
