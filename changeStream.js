import {MongoClient} from 'mongodb';
import {documents} from './data.js';
import {logAllDocuments} from './mongoClient.js';

const mongoClient = new MongoClient('mongodb://localhost:27017?replicaSet=rs0&directConnection=true', { replicaSet: 'rs0' });
await mongoClient.connect();
const db = mongoClient.db('mongo-playground');
const eventsCollection = db.collection('events');
const timecardsCollection = db.collection('timecards');

await eventsCollection.deleteMany()
await timecardsCollection.deleteMany()
await timecardsCollection.insertMany(documents)

await logAllDocuments(eventsCollection)
await logAllDocuments(timecardsCollection)

const changeStream = eventsCollection.watch();
changeStream.on('change', next => {
  console.log('eventsCollection new event', next.fullDocument);
  const jobId = next.fullDocument.jobId
  // console.log('stream', jobId);
  timecardsCollection.updateMany(
    { jobId }, 
    { 
      $set: { modified: true },
      $inc: { size: 1 }, 
    },
  )
});

await eventsCollection.insertOne({ type: 'EXPLODE', jobId: 1 })
await eventsCollection.insertOne({ type: 'EXPLODE2', jobId: 2 })

setTimeout(async () => {
  console.log('bye bye');
  await changeStream.close()
  await logAllDocuments(eventsCollection)
  await logAllDocuments(timecardsCollection)
  await mongoClient.close()
}, 1000)
// await mongoClient.close()