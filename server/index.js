const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    connection = require('./initial'),
    mailer = require('./mailer'),
    app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

app.use(function (req, res, next) {
    var allowedOrigins = ['http://mysocials.ru', 'https://mysocials.ru'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

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
            const message = {
                // to: req.body.email,
                to: [`${req.body.email}`, 'mysocials@yandex.ru'],
                subject: 'Регистрация на mysocials.ru',
                html: `
                <div style="width: 100%; height: 100%; padding: 10px; text-align: center; background: linear-gradient(rgba(135, 60, 255, 0.4), rgba(135, 60, 255, 0.0) 80%), linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 25%, rgba(255, 160, 65, 0.9) 75%);">
                <h2 style="color: white;">Поздравляем, Вы успешно зарегистрировались на https://mysocials.ru!</h2>
                <p style="color: white;">Ссылка на страницу: https://mysocials.ru/${req.body.username}</p>
                <p style="color: white;">Авторизоваться для редактирования: https://mysocials.ru/#login</p>
                <p style="color: white;">Зарегистрировать другую страницу: https://mysocials.ru/#register</p>
                </div>
            `
            }
            mailer(message)
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

app.get('/api/getcount', (req, res) => {
    connection.query('SELECT COUNT(*) FROM users;', (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json(
                results
            )
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
            delete results[0]['password']
            delete results[0]['email']
            // delete results[0]['verified']
            delete results[0]['id']
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

app.get('/api/delete', (req, res) => {
    const fields = ['username', `${req.query.username}`, 'password', `${req.query.password}`]
    let query = 'DELETE FROM users WHERE ??=? AND ??=SHA1(?)'

    connection.query(query, fields, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            res.send('Deleted')
        }
    })
})





















const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
})