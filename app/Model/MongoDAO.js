/**
 * Created by AntonioGiordano on 10/06/16.
 */

module.exports = {
  findOne: (db, collectionName, filters, cb) => {
    db.collection(collectionName).findOne(filters, (err, result) => {
      cb(err, result)
    })
  },
  find: (db, collectionName, filters, options) => {
    return db.collection(collectionName).find(filters, options)
  },
  create: (db, collectionName, object, cb) => {
    db.collection(collectionName).insertOne(object, (err) => {
      cb(err)
    })
  },
  update: (db, collectionName, filters, object, cb) => {
    db.collection(collectionName).updateOne(filters, object, (err) => {
      cb(err)
    })
  },
  deleteOne: (db, collectionName, filters, options, cb) => {
    db.collection(collectionName).deleteOne(filters, options, (err) => {
      cb(err)
    })
  }
}
