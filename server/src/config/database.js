const mongoose = require('mongoose');
const dbUser = encodeURIComponent(process.env.DB_USER);
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true, dbName: '' } };

module.exports = async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    await mongoose.disconnect();
  }
};
