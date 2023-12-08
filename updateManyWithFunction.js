import { MongoClient } from 'mongodb';
import {logAllDocuments} from './mongoClient.js';

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
  { jobId: 1, value: 1, events: [], },
  { jobId: 1, value: 2, isArchived: false, events: [ { type: 'old event' } ], },
  { jobId: 2, value: 3, isArchived: false, events: [], },
]

console.dir(documentsToInsert, { depth: null });

await collection.drop();
const result = await collection.insertMany(documentsToInsert);

function applyEvent(document, event) {
  return {
    ...document,
    ...event.changes,
  }
}

const event = {
  type: 'shiny event',
  changes: {
    isArchived: true,
  },
};

const mongoFunction = { 
  $function: { 
    body: applyEvent.toString(), 
    args: ["$$ROOT", event], 
    lang: "js", 
  } 
};

const updateResult = await collection.updateMany({ jobId: 1 }, [
  { $set: { events: { $concatArrays: ['$events', [event]]} } },
  { $replaceRoot: { newRoot: mongoFunction } },
]);

await logAllDocuments(collection)
await collection.deleteMany();
