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
    function(request, response) {
        console.log(request.body);

    }
);
app.post("/event/del", bodyParser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body);
    }
);

app.post("/user/add", bodyParser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body);
    }
);

app.post("/user/connect", bodyParser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body);
    }
);

app.post("/user/del", bodyParser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body);
    }
);

app.post("/user/disconnect", bodyParser.urlencoded({ extended: true }),
    function(request, response) {
        console.log(request.body);
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