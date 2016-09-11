/**
 * Created by AntonioGiordano on 26/07/16.
 */

'use strict'

const DAO = require('../Model/MongoDAO.js')
const consts = require('../../shared/consts.js')

class Scheda {
  init (params) {
    if (typeof params._id !== 'undefined') this._id = params._id
    if (typeof params.nome !== 'undefined') this.nome = params.nome
    for (var s in consts.SOSTANZE) {
      if (typeof params[consts.SOSTANZE[s]] !== 'undefined') {
        this[consts.SOSTANZE[s]] = params[consts.SOSTANZE[s]]
      } else {
        this[consts.SOSTANZE[s]] = 0
      }
    }
  }

  constructor (params) {
    if (typeof params !== 'undefined') {
      this.init(params)
    }
  }

  getList (db, cb) {
    DAO.find(db, 'schede').toArray(cb)
  }

  getById (_id, db, cb) {
    db.collection('schede').findOne({_id: _id}, (err, scheda) => {
      if (err) return cb(err)
      if (scheda === null) return cb(new Error('Non trovato'))
      this.init(scheda)
      cb(null)
    })
  }

  save (db, cb) {
    if (typeof this._id === 'undefined') {
      DAO.create(db, 'schede', this, (err) => {
        cb(err)
      })
    } else {
      DAO.update(db, 'schede', {_id: this._id}, this, (err) => {
        cb(err)
      })
    }
  }

  delete (db, cb) {
    DAO.deleteOne(db, 'ubiatars', {_id: this._id}, (err) => {
      cb(err)
    })
  }
}

module.exports = Scheda
