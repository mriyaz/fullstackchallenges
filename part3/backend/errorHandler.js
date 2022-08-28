

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('error.message::::::::', error.message)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler