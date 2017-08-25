const express = require('express');
const mustache = require('mustache');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./classes/User.js');
const Event = require('./classes/Event.js');
const Data = require('./classes/Data.js');

let app = express();
let db = new Data();

let partials = (function() {
    const folder = "template/partial";
    let partials = {};
    let files = fs.readdirSync(folder);
    for (let f of files) {
        let data = fs.readFileSync(folder + '/' + f).toString();
        partials[f] = data;
        mustache.parse(data);
    }
    return partials;
}());

app.engine('html', function(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err)
        }
        var rendered = mustache.render(content.toString(), options, partials);
        return callback(null, rendered);
    })
});

app.set('views', './template');
app.set('view engine', 'html');

app.use(express.static('public'));

app.post("/event/add", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        if (req.body.title !== undefined && req.session.pseudo !== undefined &&
            req.body.date !== undefined && req.body.desc !== undefined) {
            db.addEvent(new Event(req.body.title, req.session.pseudo,
                req.body.date, req.body.desc));
        }

    }
);
app.post("/event/del", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        if (req.session.user !== undefined &&
            req.body.tCreate !== undefined &&
            req.session.user === db.getEvent(req.body.tCreate).author) {
            db.delEvent(db.getEvent(tCreate));
        }
    }
);

app.post("/user/add", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            req.body.pass !== undefined) {
            db.addUser(new User(req.body.pseudo, req.body.pass));
            res.session.user = req.body.pseudo;
        }
        console.log(res.session.user);
    }
);

app.post("/user/connect", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            db.getUser(req.body.pseudo) !== false &&
            db.getUser(req.body.pseudo).connect(req.body.pass)) {
            res.session.user = req.body.pseudo;
        }
    }
);

app.post("/user/del", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            req.body.pass !== undefined) {
            db.delUser(new User(req.body.pseudo, req.body.pass));
        }
    }
);

app.post("/user/disconnect", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        console.log(req.body);
        req.session = {};
    }
);

app.get('/:name', function(req, res) {
    res.render(req.params.name, { title: 'Hey', message: 'Hello there!' })
});

app.listen(8080, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('listening on 8080...')
});