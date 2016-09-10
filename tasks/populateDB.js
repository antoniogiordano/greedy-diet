/**
 * Created by AntonioGiordano on 27/05/16.
 */

const MongoClient = require('mongodb').MongoClient
const async = require('async')
const moment = require('moment')
const config = require('../server-config.js')
const minimist = require('minimist')

const consts = require('../shared/consts.js')

const handleError = (err) => {
  if (err) {
    console.log(err)
    throw err
  }
}

const create = (opts, cb) => {
  MongoClient.connect(config.dbOpts.url, { w: 1 }, (err, db) => {
    handleError(err)

    var ingredienti = db.collection('ingredienti')

    async.series([
      (cb) => {
        ingredienti.insertOne({
          nome: 'Petto di pollo',
          proteine: 23.3,
          carboidrati: 0,
          grassi: 0.8,
          fibre: 0,
          calorie: 110
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Tonno',
          proteine: 29,
          carboidrati: 0,
          grassi: 0.6,
          fibre: 0,
          calorie: 130
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Uova',
          proteine: 13,
          carboidrati: 1.1,
          grassi: 11,
          fibre: 0,
          calorie: 155
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Latte',
          proteine: 3.4,
          carboidrati: 5,
          grassi: 1,
          fibre: 0,
          calorie: 42
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Pane',
          proteine: 9,
          carboidrati: 49,
          grassi: 3.2,
          fibre: 2.7,
          calorie: 265
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Omelette',
          proteine: 11,
          carboidrati: 0.6,
          grassi: 12,
          fibre: 0,
          calorie: 154
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Banana',
          proteine: 1.1,
          carboidrati: 23,
          grassi: 0.3,
          fibre: 2.6,
          calorie: 89
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Gallette',
          proteine: 8.8,
          carboidrati: 80,
          grassi: 4,
          fibre: 4.2,
          calorie: 380
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Mais',
          proteine: 2.9,
          carboidrati: 10.8,
          grassi: 1.9,
          fibre: 3.8,
          calorie: 0
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Fagioli Cannellini',
          proteine: 5.7,
          carboidrati: 11,
          grassi: 0.9,
          fibre: 5.5,
          calorie: 87
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Gran Cereale',
          proteine: 6,
          carboidrati: 66.8,
          grassi: 16,
          fibre: 6.5,
          calorie: 448
        }, (err) => {
          cb(err)
        })
      },
      (cb) => {
        ingredienti.insertOne({
          nome: 'Mozzarella',
          proteine: 28,
          carboidrati: 3.1,
          grassi: 17,
          fibre: 0,
          calorie: 280
        }, (err) => {
          cb(err)
        })
      }
    ], (err) => {
      db.close()
      return cb(err)
    })
  })
}

if (require.main === module) {
  create(minimist(process.argv.slice(2)), (err) => {
    handleError(err)
    console.log('DONE')
  })
}

module.exports.create = create
