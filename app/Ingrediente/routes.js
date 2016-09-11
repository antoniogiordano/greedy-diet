/**
 * Created by AntonioGiordano on 10/09/16.
 */

const Boom = require('boom')
const Ingrediente = require('./Ingrediente.js')

const list = (req, reply) => {
  var db = req.server.plugins['hapi-mongodb'].db

  var ingrediente = new Ingrediente()
  ingrediente.getList(db, (err, ingredienti) => {
    if (err) return reply(Boom.badImplementation(err.message))

    return reply({
      result: 1,
      ingredienti: ingredienti
    })
  })
}

const updateIngrediente = (req, reply) => {
  var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID
  var db = req.server.plugins['hapi-mongodb'].db

  var ingrediente = new Ingrediente()
  ingrediente.getById(new ObjectID(req.params.id), db, (err) => {
    if (err) return reply(Boom.badImplementation(err.message))

    console.log(req.payload.ingrediente)

    for (var p in req.payload.ingrediente) {
      ingrediente[p] = req.payload.ingrediente[p]
    }

    console.log(ingrediente)

    ingrediente.save(db, (err) => {
      if (err) return reply(Boom.badImplementation(err.message))

      return list(req, reply)
    })
  })
}

const addIngrediente = (req, reply) => {
  var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID
  var db = req.server.plugins['hapi-mongodb'].db

  var ingrediente = new Ingrediente()
  ingrediente.init(req.payload.ingrediente)
    console.log(req.payload.ingrediente)

    console.log(ingrediente)

    ingrediente.save(db, (err) => {
      if (err) return reply(Boom.badImplementation(err.message))

      return list(req, reply)
    })
}

module.exports = [
  {
    method: 'GET',
    path: '/ingredienti',
    handler: (req, reply) => {
      reply.view('Ingrediente/list/list.ejs')
    }
  },
  {
    method: 'GET',
    path: '/ingredienti.json',
    handler: list
  },
  {
    method: 'PUT',
    path: '/ingrediente/{id}.json',
    handler: updateIngrediente
  },
  {
    method: 'POST',
    path: '/ingrediente.json',
    handler: addIngrediente
  }
]
