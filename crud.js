const connectDB = require('./db');

async function createMahasiswa(data) {
  const db = await connectDB();
  await db.collection('mahasiswa').insertOne(data);
}

async function readMahasiswa() {
  const db = await connectDB();
  return db.collection('mahasiswa').find().toArray();
}

async function updateMahasiswa(nim, newData) {
  const db = await connectDB();
  await db.collection('mahasiswa').updateOne({ nim }, { $set: newData });
}

async function deleteMahasiswa(nim) {
  const db = await connectDB();
  await db.collection('mahasiswa').deleteOne({ nim });
}


module.exports = {
  createMahasiswa,
  readMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
};
