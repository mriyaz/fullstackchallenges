const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const errorHandler = require('./errorHandler')

const url = process.env.MONGODB_URI
//connect to DB
mongoose.connect(url).then((result) => {
  console.log('Connected to mongodb')
}).catch(err => {
  console.log('Error Connecting:', err)
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postbody'))

morgan.token('postbody', function (req, res) {
  if (req.method === 'POST')
    return JSON.stringify(req.body)
})


app.get('/api/persons', (req, resp, next) => {
  Person.find({}).then(result => {
    resp.json(result)
  }).catch(error => next(error))

})

app.get('/info', (req, resp, next) => {
  let dat = new Date()
  Person.find({}).then(result => {
    let len = result.length
    resp.send('Phonebook has info for ' + len + ' people <br/> ' + dat)
  }).catch(error => next(error))

})

app.get('/api/persons/:id', (req, resp, next) => {
  Person.findById(req.params.id).then(person => {
    if (person)
      resp.json(person)
    else
      resp.status(404).end()
  }).catch(err => next(err))

})


app.put('/api/persons/:id', (req, resp, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' }).then(person => {
    resp.json(person)
  }).catch(err => next(err))

})

app.delete('/api/persons/:id', (req, resp) => {
  Person.deleteOne({ _id: req.params.id }).then(res => {
    resp.status(204).end()
  })
})

app.post('/api/persons', (req, resp, next) => {
  const body = req.body
  if (!body.name || !body.number || body.name === '' || body.number === '') {
    return resp.status(400).json({
      error: 'name or number is missing'
    })
  }

  //If an HTTP POST request tries to add a name that is already in the phonebook,
  //the server must respond with an appropriate status code and error message.
  Person.findOne({ name: body.name }).then(res => {
    console.log('res:::::::', res)
    if (res !== null) {
      return resp.status(400).json({
        error: 'name is already present'
      })
    } else {

      const person = new Person({
        name: body.name,
        number: body.number
      })

      person.save().then(savedPerson => {
        resp.json(savedPerson)
      }).catch(error => next(error))
    }
  })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})