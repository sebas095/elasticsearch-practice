const { Router } = require("express");
const router = Router();
const controller = require("../controllers");

/**
 * The initial request that loads the form and all the documents in
 * Elasticsearch.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
router.get("/", controller);

/**
 * Processes form submissions by modifying the query for Elasticsearch.
 *
 * @param {Object} req
 *   The request object.
 * @param {Object} res
 *   The response object.
 */
router.post("/", controller);

module.exports = router;
