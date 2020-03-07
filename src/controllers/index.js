const isEmpty = require("../helpers");
const { ES_HOST, ES_PORT } = require("../config");
const { esClient: client } = require("../config/esConfig");

/**
 * Performs a query against Elasticsearch and renders
 * the response.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
const doSearch = async (req, res) => {
  // Initialize the Elasticsearch client.
  let searchString = "";
  let searchType = "";

  // Prepare the request body.
  const body = {
    size: 100
  };

  if (!isEmpty(req.query, "search") || !isEmpty(req.query, "type")) {
    const query = {
      bool: {}
    };

    if (!isEmpty(req.query, "search")) {
      query.bool.must = {
        multi_match: {
          fields: ["title", "summary"],
          query: req.query.search,
          fuzziness: "auto"
        }
      };
      searchString = req.query.search;
    }

    if (!isEmpty(req.query, "type")) {
      query.bool.filter = [
        {
          term: {
            type: req.query.type
          }
        }
      ];
      searchType = req.query.type;
    }

    body.query = query;
  }

  // Add a type facet.
  body.aggs = {
    type: {
      terms: {
        field: "type"
      }
    }
  };

  try {
    // Perform the search request.
    const resp = await client.search({
      index: "elasticsearch_index_demo_elastic",
      body
    });

    res.render("index", {
      hits: resp.body.hits.hits,
      total: resp.body.hits.total.value,
      aggregations: resp.body.aggregations.type.buckets,
      searchString,
      searchType
    });
  } catch (err) {
    console.trace(err.message);
  }
};

module.exports = doSearch;
