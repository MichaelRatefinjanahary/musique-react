const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');
const port = process.env.PORT || 8080;
const https = require('https');
const app = express();

var request = require('request');
var agentOptions;
var agent;

agentOptions = {
    host: 'wasabi.i3s.unice.fr'
    , port: '443'
    , path: '/'
    , rejectUnauthorized: false
};

agent = new https.Agent(agentOptions);

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(sslRedirect());
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/api/Artists/lettre/:alphabet/page/:page', (req, res) => {
    const alphabet = req.params.alphabet;
    const page = req.params.page;
    request({
        url: "https://wasabi.i3s.unice.fr/search/categorie/Artists/lettre/" + alphabet + "/page/" + page
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        res.json(JSON.parse(body));
    });
});
app.get('/api/fulltext/:value', (req, res) => {
    const value = req.params.value;
    request({
        url: "https://wasabi.i3s.unice.fr/search/fulltext/" + value
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        res.json(JSON.parse(body));
    });
});
app.get('/api/artist/:artistName', (req, res) => {
    const artistName = req.params.artistName;
    request({
        url: "https://wasabi.i3s.unice.fr/search/artist/" + artistName
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        res.json(JSON.parse(body));
    });
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);