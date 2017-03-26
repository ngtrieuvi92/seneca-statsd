/* Copyright (c) 2017, Richard Rodger and other contributors, MIT License. */

'use strict'


var Dgram = require('dgram')


module.exports = statsd



function statsd (options) {
  var seneca = this

  var client = Dgram.createSocket('udp4')
  var port = options.port || 8125
  var host = options.host || '127.0.0.1'

  seneca.on('act-in', function (msg) {
    var data = new Buffer('seneca.'+intern.format(msg.meta$.pattern)+':1|c')
    // console.log(data.toString())
    client.send(data, 0, data.length, port, host,
                function(err) { if (err) seneca.log.warn(err) })

  })
}


var intern = module.exports.intern = {
  format: function (pattern) {
    return pattern
      .replace(/:/g, '_')
      .replace(/,/g, '__')
  }
}

