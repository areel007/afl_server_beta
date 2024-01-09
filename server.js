const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.set('strictQuery', false)

mongoose.connect(DB).then(con => {
  console.log('DB connection succesful')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${process.env.PORT}`))