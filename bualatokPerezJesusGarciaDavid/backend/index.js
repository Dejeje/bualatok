const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

var routes = require('./routes/index');

app.use(bodyParser.urlencoded( { extended: false} ));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})