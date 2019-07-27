const express = require("express");
const path = require("path");
var cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('express-jwt')

const schema = require("./schema");
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const app = express();

app.use(cors());

app.use("/api", bodyParser.json(), graphqlExpress({
    schema,
}));

app.use("/apii", bodyParser.json(), graphiqlExpress({
    endpointURL: "/api",
}));

app.use(express.static(path.join(__dirname, '../', '../', 'frontend', 'build')));

app.listen(3000, () => console.log("App is listening on port 3000"));
