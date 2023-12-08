import {MongoClient} from 'mongodb';
import {documents} from './data.js';

export async function getCollection() {
  const mongoClient = new MongoClient('mongodb://localhost:27017');
  await mongoClient.connect();
  const db = mongoClient.db('mongo-playground');
  const collection = db.collection('event🧙Sorceress');
  
  await collection.deleteMany();
  
  console.log('initial documents');
  console.dir(documents, { depth: null });
  console.log();
  const result = await collection.insertMany(documents);
  // console.log('insertMany', result);
  
  return collection;
}

export async function logAllDocuments(collection) {
  const updatedDocuments = await collection.find();
  // console.log('updated documents');
  console.dir((await updatedDocuments.toArray()).map(_ => ({ ..._, _id: _._id.toString() })), { depth: null });
  console.log();
}