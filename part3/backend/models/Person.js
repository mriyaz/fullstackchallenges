const mongoose = require('mongoose')

//create schema
const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`

    }
  }
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//create model
module.exports = mongoose.model('Person', phonebookSchema)