const { esClient: client } = require("../config/esConfig");
const data = require("./index.json");
const { index, properties } = require("./index_mapping.json");

async function writeDataToEs(client, data) {
  for (let i = 0; i < data.length; i++) {
    try {
      const response = await client.create({
        refresh: true,
        index: data[i]._index,
        id: data[i]._id,
        body: data[i]._source
      });

      console.log("Successfully imported data", data[i]);
    } catch (err) {
      console.error("Failed to import data", error);
      return;
    }
  }
}

async function createMapping(client, index, schema) {
  return client.indices.putMapping({
    index,
    body: { properties: schema }
  });
}

async function loadData() {
  const { body: existsIndex } = await client.indices.exists({ index });
  if (existsIndex) {
    await client.indices.delete({ index });
  }

  await client.indices.create({ index });
  await createMapping(client, index, properties);
  await writeDataToEs(client, data);
}

loadData()
  .then(() => console.log("Data loaded!"))
  .catch(console.log);
