var express = require ("express");

const PORT_NUMBER = 3000;
const server = express ();

server.set ("json spaces", 2);

server.get ("/foo", (request, response) => {
  response.send ({ text: "foo" });
});

server.get ("/bar", (request, response) => {
  response.send ({ text: "bar" });
});

server.listen (PORT_NUMBER, () => {
  console.log ("Express is listening on port", PORT_NUMBER);
});
