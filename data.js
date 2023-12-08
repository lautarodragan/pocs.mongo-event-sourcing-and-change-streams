import {archiveEvent, explodeEvent} from './events.js';

export const events = [explodeEvent, archiveEvent, explodeEvent]

export const initialDocument = {
  name: 'classified document',
  isArchived: false,
}

export const documents = [
  { jobId: 1, value: 1, size: 42 },
  { jobId: 1, value: 2, isArchived: false },
  { jobId: 2, value: 3, isArchived: false },
]