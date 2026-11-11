const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${encodeURIComponent(password)}@cluster0.bzo50g2` +
'.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 } )

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(res => {
  console.log(res)
  mongoose.connection.close()
})