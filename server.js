/**
 * Created by AntonioGiordano on 03/06/16.
 */

'use strict'

const fs = require('fs')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const async = require('async')
const minimist = require('minimist')
const ejs = require('ejs')
const path = require('path')

const noop = (err) => {
  if (err) throw err
}

const handleError = (err) => {
  if (err) {
    console.log(err)
    throw err
  }
}

const build = (opts, cb) => {
  const server = new Hapi.Server({
    connections: {
      routes: {
        files: {
          relativeTo: path.join(__dirname, 'public')
        }
      }
    }
  })
  cb = cb || noop
  server.connection({
    port: opts.port
  })

  async.series([
    (cb) => {
      // Register inert plugin to handle Static files (./public/*)
      server.register(Inert, (err) => {
        if (err) cb(err)

        server.route({
          method: 'GET',
          path: '/{param*}',
          handler: {
            directory: {
              path: '.',
              redirectToSlash: false,
              index: true
            }
          }
        })
        cb(null, 'inert')
      })
    },
    (cb) => {
      // Register EJS HTML rendering Plugin
      server.register(Vision, (err) => {
        if (err) return cb(err)

        server.views({
          engines: {ejs: ejs},
          relativeTo: __dirname,
          path: 'app'
        })
        cb(null, 'vision')
      })
    }
  ], (err) => {
    handleError(err)

    server.route(require('./app/Usar/routes.js'))
    server.route(require('./app/Avatar/routes.js'))
    cb(null, server)
  })

  return server
}

module.exports = build

const start = (opts, cb) => {
  build(opts, (err, server) => {
    if (err) return cb(err)
    server.start((err) => {
      cb(err, server)
    })
  })
}

module.exports.start = start

if (require.main === module) {
  start(minimist(process.argv.slice(2), {
    integer: ['port'],
    alias: {
      port: 'p'
    },
    default: {
      port: 12300
    }
  }), (err, server) => {
    handleError(err)

    console.log('Server running at:', server.info.uri)
  })
} else {
  console.log('Running in test mode')
}
