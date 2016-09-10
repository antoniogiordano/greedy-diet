/**
 * Created by AntonioGiordano on 10/09/16.
 */


const Joi = require('joi')
const Boom = require('boom')
const _ = require('lodash')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply.view('Misc/home/home.ejs')
    }
  }
]
