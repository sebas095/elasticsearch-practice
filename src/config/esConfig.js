const { Client } = require("@elastic/elasticsearch");
const { ES_HOST, ES_PORT } = require(".");
const client = new Client({
  node: `http://${ES_HOST}:${ES_PORT}`
});

module.exports = { esClient: client };
