const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user')
  response.json(notes)
})

//4.20
notesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user._id,
    likes:body.likes,
    url:body.url,
    title:body.title,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//4.21
notesRouter.delete('/:id', async (request, response) => {
  const deleteBlog = await Note.findById(request.params.id)
  if (request.user.id.toString() === deleteBlog.user.toString()) {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else {
    return response.status(400).send({ error: 'Only the author can delete this' })
  }
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter