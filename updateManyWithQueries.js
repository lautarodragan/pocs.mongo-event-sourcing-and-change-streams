import {getCollection, logAllDocuments} from './mongoClient.js';
import {events} from './data.js';
import {applyEvent} from './events.js';

const jobId = 1

const collection = await getCollection();

const initialDocuments = await collection.find({ jobId }).toArray()

for (const initialDocument of initialDocuments) {
  const newDocument = events.reduce(applyEvent, initialDocument)
  await collection.updateOne(
    { _id: initialDocument._id },
    { 
      $set: newDocument,
      $push: { events: events } 
    },
  );
}


await logAllDocuments(collection)

await collection.client.close()