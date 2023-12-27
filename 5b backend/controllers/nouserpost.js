const NonotesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


//4.17
NonotesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.find()
  adduser = user[0]
  console.log(adduser);
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    likes:body.likes,
    url:body.url,
    title:body.title,
    user: adduser._id
  })

  const savedNote = await note.save()
  adduser.notes = adduser.notes.concat(savedNote._id)
  await adduser.save()

  response.json(savedNote)
})

module.exports = NonotesRouter