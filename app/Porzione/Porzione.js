/**
 * Created by AntonioGiordano on 26/07/16.
 */

'use strict'

const DAO = require('../Model/MongoDAO.js')
const consts = require('../../shared/consts.js')

class Porzione {
  init (params) {
    if (typeof params._id !== 'undefined') this._id = params._id
    if (typeof params.ingredienteId !== 'undefined') this.ingredienteId = params.ingredienteId
    if (typeof params.quantita !== 'undefined') this.quantita = parseFloat(params.quantita)
    if (typeof params.nomeSing !== 'undefined') this.nomeSing = params.nomeSing
    if (typeof params.nomePlur !== 'undefined') this.nomePlur = params.nomePlur
    if (typeof params.maxCount !== 'undefined') this.maxCount = params.maxCount
  }

  constructor (params) {
    if (typeof params !== 'undefined') {
      this.init(params)
    }
  }

  getList (db, cb) {
    DAO.find(db, 'porzioni').toArray(cb)
  }

  getByIngrId (ingrId, db, cb) {
    db.collection('porzioni').findOne({ingredienteId: ingrId}, (err, porzione) => {
      if (err) return cb(err)
      porzione = porzione !== null ? porzione : {}
      this.init(porzione)
      cb(null)
    })
  }

  save (db, cb) {
    if (typeof this._id === 'undefined') {
      DAO.create(db, 'porzioni', this, (err) => {
        cb(err)
      })
    } else {
      DAO.update(db, 'porzioni', {_id: this._id}, this, (err) => {
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

module.exports = Porzione
