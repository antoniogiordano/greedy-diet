/**
 * Created by AntonioGiordano on 10/09/16.
 */

const Boom = require('boom')
const async = require('async')
const Porzione = require('./Porzione.js')

const list = (req, reply) => {
  var db = req.server.plugins['hapi-mongodb'].db

  var porzione = new Porzione()
  porzione.getList(db, (err, porzioni) => {
    if (err) return reply(Boom.badImplementation(err.message))

    return reply({
      result: 1,
      porzioni: porzioni
    })
  })
}

const updateAll = (req, reply) => {
  var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID
  var db = req.server.plugins['hapi-mongodb'].db

  async.eachSeries(req.payload.porzioni, (item, cb) => {
    var porzione = new Porzione()
    porzione.getByIngrId(new ObjectID(item.porzione.ingredienteId), db, (err) => {
      if (err) return cb(err)

      for (var p in item.porzione) {
        porzione[p] = item.porzione[p]
      }
      if (typeof item.porzione._id !== 'undefined') {
        porzione._id = new ObjectID(item.porzione._id)
      }

      porzione.save(db, (err) => {
        if (err) return cb(err)

        cb(null)
      })
    })
  }, (err) => {
    if (err) return reply(Boom.badImplementation(err.message))

    return reply({
      result: 1
    })
  })
}

module.exports = [
  {
    method: 'GET',
    path: '/porzioni',
    handler: (req, reply) => {
      reply.view('Porzione/list/list.ejs')
    }
  },
  {
    method: 'GET',
    path: '/porzioni.json',
    handler: list
  },
  {
    method: 'PUT',
    path: '/porzioni.json',
    handler: updateAll
  }
]
