import {getCollection, logAllDocuments} from './mongoClient.js';
import {explodeEvent} from './events.js';

const collection = await getCollection();

const updateResult = await collection.updateMany(
  { jobId: 1 },
  { 
    $set: {
      kaboom: explodeEvent.payload.kaboom, 
    },
    $inc: { size: 1 },
    $push: {
      events: explodeEvent,
    }
  },
);

await logAllDocuments(collection)

await collection.client.close()