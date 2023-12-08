import {getCollection, logAllDocuments} from './mongoClient.js';
import {events} from './data.js';
import {applyEvent} from './events.js';

const jobId = 2

const collection = await getCollection();

const initialDocument = await collection.findOne({ jobId })
const newDocument = events.reduce(applyEvent, initialDocument)

const updateResult = await collection.updateOne(
  { jobId },
  { $set: newDocument },
);

await logAllDocuments(collection)

await collection.client.close()