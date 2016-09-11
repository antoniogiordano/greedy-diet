/**
 * Created by AntonioGiordano on 10/09/16.
 */

const Boom = require('boom')
const Scheda = require('./Scheda.js')
const Ingrediente = require('../Ingrediente/Ingrediente.js')
const Porzione = require('../Porzione/Porzione.js')
const consts = require('../../shared/consts.js')

var params = {}
var alimenti = []
var P = []

const generate = (req, reply) => {
  var db = req.server.plugins['hapi-mongodb'].db
  var ObjectID = req.server.plugins['hapi-mongodb'].ObjectID

  var ingrediente = new Ingrediente()
  ingrediente.getList(db, (err, ingredienti) => {
    if (err) return reply(Boom.badImplementation(err.message))

    var porzione = new Porzione()
    porzione.getList(db, (err, porzioni) => {
      if (err) return reply(Boom.badImplementation(err.message))

      for (var p in porzioni) {
        var porzione = porzioni[p]
        var ingrediente = null
        for (var i in ingredienti) {
          if (ingredienti[i]._id.toString() === porzione.ingredienteId) {
            ingrediente = ingredienti[i]
          }
        }
        var porz = {
          nome: ingrediente.nome,
          quantita: parseFloat(porzione.quantita),
          nomeSing: porzione.nomeSing,
          nomePlur: porzione.nomePlur,
          maxCount: parseFloat(porzione.maxCount),
          sostanze: {}
        }
        for (var s in consts.SOSTANZE) {
          porz.sostanze[consts.SOSTANZE[s]] = ingrediente[consts.SOSTANZE[s]] * porz.quantita / 100
        }
        P.push(porz)
      }
      console.log(P)

      params = [
        {
          nome: 'proteine',
          valore: 120,
          error: 0.2
        },
        {
          nome: 'grassi',
          valore: 80,
          error: 0.5
        },
        {
          nome: 'fibre',
          valore: 28,
          error: 0.5
        },
        {
          nome: 'carboidrati',
          valore: 120,
          error: 0.5
        },
        {
          nome: 'calorie',
          valore: 2000,
          error: 0.4
        }
      ]

      setTimeout(() => {
        recursive({
          proteine: 0, grassi: 0, carboidrati: 0, fibre: 0, calorie: 0
        }, 0)
      }, 10)

      reply({
        result: 1
      })
    })
  })
}

const recursive = (sostanze, depth) => {
  if (depth > 20) {
    return false
  }
  if (checkQuantity()) {
    return false
  }
  if (!verify(sostanze)) {
    // console.log('NON VERIFICATO: ' + JSON.stringify(alimenti))
    return false
  }
  if (isGoodEnough(sostanze)) {
    console.log('NUOVA SCHEDA: ' + JSON.stringify(alimenti) + ' SOSTANZE: '  + JSON.stringify(sostanze))
  }

  for (var p in P) {
    alimenti[depth] = P[p].nome
    // console.log(P[p])
    // console.log(sostanze)
    var newSostanze = addTo(sostanze, P[p].sostanze)
    // console.log(newSostanze)
    recursive(newSostanze, depth + 1)
  }
  delete alimenti[depth]
}

const addTo = (sostanze, daAggiungere) => {
  var newS = {}
  for (var s in sostanze) {
    newS[s] = sostanze[s] + daAggiungere[s]
  }
  return newS
}

const verify = (sostanze) => {
  for (var s in sostanze) {
    for (var p in params) {
      if (s === params[p].nome) {
        if (sostanze[s] > (params[p].valore * (1 + params[p].error))) {
          return false
        }
      }
    }
  }
  return true
}

const isGoodEnough = (sostanze) => {
  for (var s in sostanze) {
    for (var p in params) {
      if (s === params[p].nome) {
        if (Math.abs(sostanze[s] - params[p].valore) > (params[p].valore * params[p].error)) {
          return false
        }
      }
    }
  }
  return true
}

const checkQuantity = () => {
  var q = {}
  for (var i in alimenti) {
    if (typeof q[alimenti[i]] === 'undefined') q[alimenti[i]] = 0
    q[alimenti[i]]++
  }
  for (var i in q) {
    for (var p in P) {
      if (P[p].nome === i) {
        if (q[i] > P[p].maxCount) {
          return true
        }
      }
    }
  }
  return false
}

module.exports = [
  {
    method: 'GET',
    path: '/schede',
    handler: (req, reply) => {
      reply.view('Scheda/generate/generate.ejs')
    }
  },
  {
    method: 'GET',
    path: '/schede/generate.json',
    handler: generate
  }
]
