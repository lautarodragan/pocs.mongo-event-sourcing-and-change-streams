import {events, initialDocument} from './data.js';
import {applyEvent} from './events.js';

const newDocument = events.reduce(applyEvent, initialDocument)

console.dir(initialDocument)
console.dir(newDocument)

