const isPortReachable = require('is-port-reachable');
var bodyParser = require("body-parser");
const express = require('express')

const app = express()
const port = 8080


app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) =>  {
  
  res.send(`
    <html>
    <head><title>Network Test</title>
    </head>
    <body></body>
    <h1>TCP Test</h1>
    <br>
    <form action="/test/" method="post">
    Host name: <input id="host_name" type="text" name="host_name">
    <br>
    Port: <input id="port_name" type="text" name="port_name">
    <br><br>
    <input type="submit" value="Test Connection">
   </form>
   </body>
   </html>
  

  `);

});


app.post('/test', (req, res) => {

  const test_host = req.body.host_name;
  const test_port = parseInt(req.body.port_name);

  (async () => {
    const testResult = await isPortReachable(test_port, {host: test_host});
    res.send(`
    <html><head><title>Test Result></title></head>
    <body> <h3> Test Result: ${testResult} </h3>
    <br>
    <input type="button" value="Return Home" onclick="history.back(-1)" />
    </body>
    </html>
    `);

  })();
  

});






app.listen(port, () => console.log(`Listening on port: ${port}`));
