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
        console.log(req.body);
        if (req.body.title !== undefined && /*$_session['user'].pseudo !== undefined && */
            req.body.date !== undefined && req.body.desc !== undefined) {
            db.addevent(new Event(req.body.title, /*$_session['user'].pseudo*/ "bob",
                req.body.date, req.body.desc));
        }

    }
);
app.post("/event/del", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if (req.session.user !== undefined &&
            req.body.tCreate !== undefined &&
            req.session.user === db.getevent(req.body.tCreate).author) {
            db.delevent(db.getevent(tCreate));
        }
    }
);

app.post("/user/add", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            req.body.pass !== undefined) {
            db.adduser(new User(req.body.pseudo, req.body.pass));
            res.session.user = req.body.pseudo;
        }
        console.log(res.session.user);
    }
);

app.post("/user/connect", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if (db.getuser(req.body.pseudo).connect(req.body.pass)) {
            res.session.user = req.body.pseudo;
        }
    }
);

app.post("/user/del", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            req.body.pass !== undefined) {
            db.deluser(new User(req.body.pseudo, req.body.pass));
        }
    }
);

app.post("/user/disconnect", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        req.session = {};
    }
);

// req.session.regenerate(function(err) {
//     console.log("nouvelle session creer");
// });

// req.session.destroy(function(err) {
//     console.log("cannot access session here");
// });

app.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(8080, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('listening on 8080...')
});