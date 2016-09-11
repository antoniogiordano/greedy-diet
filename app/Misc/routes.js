/**
 * Created by AntonioGiordano on 10/09/16.
 */

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply.view('Misc/home/home.ejs')
    }
  }
]
