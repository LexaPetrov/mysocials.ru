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
    const query = `INSERT into users (??, ??, ??) VALUES (?,?,SHA1(?))`;
    connection.query(query, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('Successfully registered')
        }
    })
})

app.get('/api/login/:username_login/:password_login', (req, res) => {
    const fields = [
        'username', `${req.params.username_login}`,
        'password', `${req.params.password_login}`
    ]
    const query = `select * from users where ??=? and ??=SHA1(?)`;
    connection.query(query, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/api/user/:username', (req, res) => {
    const fields = [
        'username', `${req.params.username}`
    ]
    const query = 'select * from users WHERE ??=?'
    connection.query(query, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })
})

app.put('/api/save', (req, res) => {
    const fields = [
        'password', `${req.body.data.password}`,
        'email', `${req.body.data.email}`,
        'name', `${req.body.data.name}`,
        'username', `${req.body.data.username}`,
        'bio', `${req.body.data.bio}`,
        'birthday', `${req.body.data.birthday}`,
        'verified', `${req.body.data.verified}`,
        'links', JSON.stringify(req.body.data.links),
        'avatar', `${req.body.data.avatar}`,
        'cover', `${req.body.data.cover}`,
        'id', `${req.body.data.id}`
    ]
    let regex = new RegExp(/^[a-fA-F0-9]{40}$/g)
    let query = ''
    if (regex.test(`${req.body.data.password}`)) {
        query = `UPDATE users SET ??=?, ??=?, ??=?, ??=?,??=?, ??=?, ??=?, ??=?, ??=?,??=? WHERE ??=?`
    } else {
        query = `UPDATE users SET ??=SHA1(?), ??=?, ??=?, ??=?,??=?, ??=?, ??=?, ??=?, ??=?,??=? WHERE ??=?`
    }
    connection.query(query, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            res.send('Saved')
        }
    })
})


























app.listen(4000, () => {
    console.log('Server listening on 4000');
})