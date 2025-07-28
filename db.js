const {MongoClient} = require('mongodb')

const uri = 'mongodb://localhost:27017';
const dbname = 'db_kampus';

const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
    console.log('Koneksi berhasil');
    return client.db(dbname);
}

module.exports = connectDB