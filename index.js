import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient('mongodb://localhost:27017', {
  connectTimeoutMS: 2000,
  appName: 'mongo-playground',
});

mongoClient.addListener('open', (event) => {
  console.log('MongoDB connection opened');
});

mongoClient.addListener('close', () => {
  console.log('MongoDB connection closed');
});

await mongoClient.connect();

const db = mongoClient.db('mongo-playground');
const collection = db.collection('playground');

const documentsToInsert = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
]

console.log(documentsToInsert);

const result = await collection.insertMany(documentsToInsert);

console.log(result);
console.log(documentsToInsert);