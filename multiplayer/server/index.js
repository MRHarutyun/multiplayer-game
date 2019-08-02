const server = require('http').createServer();
const io = require('socket.io')(server);

const players = [];

server.listen('4000', () => { console.log('server started on port 4000') });
io.on('connection', (socket) => {
  console.log('player connected');
  socket.emit('socketID', { id: socket.id });
  socket.emit('getPlayers', players);
  socket.broadcast.emit('newPlayer', { id: socket.id });
  socket.on('playerMoved', (data) => {
    data.id = socket.id;
    socket.broadcast.emit('playerMoved', data);
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.id) {
        players[i].x = data.x;
        players[i].y = data.y;
      }
    }
  })
  socket.on('disconnect', () => {
    console.log('player disconnected');
    socket.broadcast.emit('playerDisconnected', { id: socket.id });
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == socket.id ) {
        players.splice(i, 1);
      }
    }
  });
  players.push(new Player(socket.id, 0, 0));
});

class Player {
  constructor(id, x, y) {
    this.x = x;
    this.y = y;
  }
}