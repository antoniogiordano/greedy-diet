/**
 * Created by AntonioGiordano on 27/05/16.
 */

'use strict'

const dbOpts = {
  'url': 'mongodb://localhost:27017/diet',
  'settings': {
    'db': {
      'native_parser': false
    }
  }
}

const dbTestOpts = {
  'url': 'mongodb://localhost:27017/diet_test',
  'settings': {
    'db': {
      'native_parser': false
    }
  }
}

module.exports = {
  dbOpts: dbOpts,
  dbTestOpts: dbTestOpts
}
