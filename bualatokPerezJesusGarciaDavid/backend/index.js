const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

var routes = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
