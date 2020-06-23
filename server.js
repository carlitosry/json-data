var path = require('path')
var express = require('express')
var jsonServer = require('json-server')
var routes = require('./routes.json')
var demodata = path.join(__dirname, 'db.json')
const _ = require('lodash')


const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

var router = jsonServer.router(demodata) // Express router
var mixins = jsonServer.mixins       // Express server
var server = jsonServer.create()       // Express server

server.use('/static', express.static(path.join(__dirname, 'public')))

// Avoid CORS issue
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// send error message when validating code on invest
server.get('/holdingPlanss', (req, res) => {
  console.log('/holdingPlans, error 400')
  res.status(403).jsonp({
        appName: "cfd-cajafuertedigital-api-back",
        timeStamp: 1581507900800,
        errorName: "forbidden",
        status: 403,
        internalCode: 403,
        shortMessage: "Forbidden",
        detailedMessage: "Dispositivo no seguro"
    })
})

// send error message when validating code on invest
server.post('/api/validaFirm', (req, res) => {
  console.log('/validaFirma, error 403')
  res.status(403).jsonp({
      httpCode: 403,
      httpMessage: "forbidden",
      moreInformation: "La firma no es valida."
  })
})

// send error message when validating code on invest
server.get('/api/star', (req, res) => {
  console.log('/start, error 403')
  res.status(403).jsonp({
    "httpCode":403,
    "httpMessage":"Sin telefono asociado",
    "moreInformation":"Sin telefono asociado"
  })
})

server.post('/api/addDocument', (req, res) => {
  console.log('/addDocumento, error 406')
  res.status(423);
  next()
})


server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(jsonServer.rewriter(routes))
server.use(middlewares)

server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running on http://localhost:' + port)
})