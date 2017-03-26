require('seneca')()
  .use('..')
  .add('a:1', function (msg, reply) {
    reply({x:msg.x})
  })
  .add('b:3', function (msg, reply) {
    reply({y:msg.y})
  })
  .ready(function () {
    repeat(100,this.act.bind(this,'a:1,x:2'))
    repeat(200,this.act.bind(this,'b:3,y:4'))

    function repeat(t,f) {
      function rf() {
        f()
        setTimeout(rf,t*Math.random())
      }
      rf()
    }
  })

