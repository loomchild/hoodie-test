var Hapi = require('hapi')
var hoodie = require('hoodie').register
var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-mapreduce'))
  .plugin(require('pouchdb-adapter-memory'))

var server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.register({
  register: hoodie,
  options: { // pass options here
    inMemory: true,
    PouchDB: PouchDB
  }
}, function (error) {
  if (error) {
    throw error
  }

  server.start(function (error) {
    if (error) {
      throw error
    }

    console.log(('Server running at:', server.info.uri))
  })
})
