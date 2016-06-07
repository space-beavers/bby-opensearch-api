'use strict';

var express = require('express');
var router = express.Router();

var acService = require('./../source/services/autocomplete/autocompleteService');


/**
 * Given a search term, searches the BestBuy auto-complete api and returns results formatted
 * to work with the OpenSearch format (http://www.opensearch.org/Home)
 * @param query
 * @param lang
 */
router.get('/', function(req, res, next) {
    var lang = (req.query.lang) ? req.query.lang : 'en';

    if(!req.query.query) {
        res.status(404).send({
            reason: 'Query Required'
        });
    }

    acService.fetch(req.query.query, lang).done(function(autocompleteResults) {
        res.send(autocompleteResults);
    });
});

module.exports = router;