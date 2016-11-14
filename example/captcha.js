var express = require('express')
var svgCaptcha = require('../src/index');
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.get('/captcha', function (req, res) {
    var text = svgCaptcha.captchaNumber();
    var captcha = svgCaptcha(text);

    console.log('text :: ', text)

    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})