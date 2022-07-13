const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.brbgmlq.mongodb.net/phonebook?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String

})

const Person = mongoose.model('Person', phonebookSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if (process.argv.length > 3) {
      //read and add the entry to mongodb
      console.log('process.argv.length:', process.argv.length)

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save().then(() => console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`))
    }
    else if (process.argv.length === 3) {
      console.log('process.argv.length::', process.argv.length)
      //list out all the entries in the phonebook
      return Person.find({}).then(result => {
        console.log('phonebook:')
        return result.forEach(per => {
          console.log(`${per.name} ${per.number}`)
        })
      })
    }


  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))