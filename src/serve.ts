const express = require('express')
const path = require('path')
const app = express()

app.set('port', 8080)

app.use(express.static(path.join(__dirname, '../dist/')))

const server = app.listen(app.get('port'), function () {
  const port = server.address().port
  console.log('Adapter listening on port ' + port)
})
