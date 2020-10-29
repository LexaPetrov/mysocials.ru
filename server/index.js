const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    connection = require('./initial'),
    app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/api/register', (req, res) => {
    const fields = [
        'username', 'email', 'password',
        `${req.body.username}`, `${req.body.email}`, `${req.body.password}`
    ]

    const QUERY = `INSERT into users (??, ??, ??) VALUES (?,?,SHA1(?))`;

    connection.query(QUERY, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('Successfully registered')
        }
    })
})





























app.listen(4000, () => {
    console.log('Server listening on 4000');
})