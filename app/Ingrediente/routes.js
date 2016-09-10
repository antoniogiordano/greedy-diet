/**
 * Created by AntonioGiordano on 10/09/16.
 */


const Joi = require('joi')
const Boom = require('boom')
const _ = require('lodash')

const dashboard = (req, reply) => {
  var db = req.server.plugins['hapi-mongodb'].db

  req.server.plugins['hapi-session-mongo'].user.getData(req.auth.credentials, (err, ubiatarData) => {
    var ubiatarId = new ObjectID(ubiatarData._id)
    var ubiatar = new Ubiatar()
    ubiatar.getFromId(ubiatarId, db, (err, exists) => {
      if (err) return reply(Boom.badImplementation(err.message))

      const ubiatarSubset = _.pick(ubiatar, ubiatarShared.dashboardData)

      if (exists) {
        reply({
          result: 1,
          data: {
            ubiatar: ubiatarSubset
          }
        })
      } else {
        return reply(Boom.badImplementation('Ubiatar not found'))
      }
    })
  })
}

module.exports = [
  {
    method: 'GET',
    path: '/ubiatars/dashboard.json',
    config: {
      auth: {
        strategies: ['session'],
        mode: 'required'
      },
      handler: dashboard
    }
  }
]
