const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({})
    res.json(notes)
  } catch (err) {
    next(err)
  }
})

notesRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const note = await Note.findById(id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const data = req.body
  try {
    const note = new Note({
      content: data.content,
      important: data.important || false,
    })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (err) {
    next(err)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Note.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body
  const id = req.params.id
  try {
    const options = { returnDocument: 'after', runValidators: true }
    const note = await Note.findOneAndUpdate(
      { _id: id },
      { $set: { content, important } },
      options
    )
    res.json(note)
  } catch (err) {
    next(err)
  }
})

module.exports = notesRouter