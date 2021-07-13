var http = require('http');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '.')));

app.use('/', routes);

app.set('port', port);

var server = http.createServer(app);

server.listen(port);
