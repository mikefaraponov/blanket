import Express                          from 'express'
import { Server }                       from 'http'
import { join }                         from 'path'
import favicon                          from 'serve-favicon'
import logger                           from 'morgan'
import { json, urlencoded }             from 'body-parser'
import Socket                           from 'socket.io'
import Debug                            from 'debug'

const app       = Express(),
      debug     = Debug('blanket:api:server'),
      root_path = join(__dirname, 'public'),
      server    = Server(app),
      io        = Socket(server);

app
  .use(logger('dev'))
  .use(favicon(join(__dirname, '..', 'static', 'favicon.png')))
  .use(json())
  .use(urlencoded({ extended : false }))
  .use(Express.static(join(__dirname, '..', 'static')))
  .use(function (req, res) {
     res.sendFile('index.html', {root: __dirname})
  })

server
  .listen(process.env.PORT || 1337, onStart)
  .on('error', onError)
  .on('listening', onListening);


function onStart(err){
    if(!err)
        debug(`Server started!`);
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : `port ${addr.port}`;
  debug('Listening on ' + bind);
}

function onError(err) {
  const { port } = err;
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (err.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
