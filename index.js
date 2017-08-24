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
        if (req.body.title !== undefined && /*$_session['user'].pseudo !== undefined && */
            req.body.date !== undefined && req.body.desc !== undefined /* && session === dbgeteventauthor*/ ) {}
        /*db.delevent(dbgetevent.tCreate);*/
    }
);

app.post("/user/add", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if (req.body.pseudo !== undefined &&
            req.body.pass !== undefined) {
            db.adduser(new User(req.body.pseudo, req.body.pass));
            // create session cookie
        }
    }
);

app.post("/user/connect", bodyParser.urlencoded({ extended: true }),
    function(req, res) {
        console.log(req.body);
        if ( /*dbgetuser.connect(req.body.pass)*/ true) {
            // create session cookie
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
        //delete user cookie
    }
);

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