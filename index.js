const Ticket = require('./lib/ticket');
const User = require('./lib/user');

const BodyParser = require('body-parser');
const Express = require('express');
const Cors = require('cors');
const Path = require('path');

const app = Express();

//** PARAMETERS **//

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors({origin: 'http://localhost:4200'}));
//Express().use(Cors({origin: 'http://109.31.193.30'}));
//Express().use(Cors({origin: 'http://ideal-lnt.fr'}));
app.use(Express.static(Path.join(__dirname, 'public')));
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//** DEFAULT PATH **//

app.get('/', (req, res) => { res.send('Server is open!') } );

//** USER PATH **//

app.get('/listUsers', User.getAll);
app.get('/listUsers/:id', User.getOne);
app.post('/addUser', User.addOne);
app.post('/updateUser/:id', User.updateOne);
app.delete('/deleteUser/:id', User.deleteOne);
app.post('/login', User.login);

//** TICKET PATH **//

app.get('/listTickets', Ticket.getAll);
app.get('/listTickets/:id', Ticket.getOne);
app.post('/addTicket', Ticket.addOne);
app.post('/updateTicket/:id', Ticket.updateOne);
app.delete('/deleteTicket/:id', Ticket.deleteOne);

//** SERVER LISTEN **//

const server = app.listen(serverInfo.port, () => {
   console.log(`Server started! Listening on port ${server.address().port}`);
});