const app = require('./src/app.js');
const dotenv = require('dotenv');
const mongoose= require ('mongoose');

dotenv.config()

const port=process.env.PORT||4000


const MONGODB_URI=process.env.MONGO_URL||'';
mongoose.connect(MONGODB_URI, {
  });
  
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });



app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});

