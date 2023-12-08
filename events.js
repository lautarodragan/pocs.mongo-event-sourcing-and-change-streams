export const Event = (type, payload) => ({
  type,
  payload,
})

export const archiveEvent = Event('ARCHIVE', { isArchived: true })
export const explodeEvent = Event('EXPLODE', { kaboom: true })

const applyArchiveEvent = (document, event) => ({
  ...document,
  isArchived: event.payload.isArchived,
})

const applyExplodeEvent = (document, event) => ({
  ...document,
  kaboom: event.payload.kaboom,
  size: (document.size || 0) + 1,
})

export const applyEvent = (document, event) => {
  if (event.type === 'ARCHIVE')
    return applyArchiveEvent(document, event)
    
  if (event.type === 'EXPLODE')
    return applyExplodeEvent(document, event)
    
  throw "I ain't never seen that event"
}

