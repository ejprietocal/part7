
import logger from './logger.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

// const logger = require('./logger')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if(error.name === 'Short password'){
    return response.status(400).send({ error: 'Password must contain more than 3 characters' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (request,response, next) =>{
  request.token  = getTokenFrom(request)
  next()
}


const getUserFrom = async (request) =>{
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  return user
} 

const userExtractor = async(request, response, next) =>{
  request.user = await getUserFrom(request)
  // console.log(request.user)
  next()
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}