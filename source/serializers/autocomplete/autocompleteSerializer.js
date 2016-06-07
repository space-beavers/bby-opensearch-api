'use strict';

var Q = require('q');
var config = require('./../../config.js');

/**
 * @desc transforms raw autocomplete results into opensearch format
 * @ref http://www.opensearch.org/Specifications/OpenSearch/Extensions/Suggestions/1.1#Response_content
 * @param autocompleteResults raw results from autocomplete api
 */
function serialize(query, autocompleteResults) {
    var deferred = Q.defer();

    // collect the searchTerms into an array
    var searchBaseUrl = config.SEARCH_PAGE_URL;
    var searchTermsBucket = [];
    var numResultsBucket = [];
    var searchUrlsBucket = [];

    JSON.parse(autocompleteResults).suggestions.forEach(function(suggestion) {
        searchTermsBucket.push(suggestion.name);
        numResultsBucket.push('xyz results');
        searchUrlsBucket.push(searchBaseUrl + suggestion.name);
    });

    var returnObj = [
        query,
        searchTermsBucket,
        numResultsBucket,
        searchUrlsBucket
    ];

    deferred.resolve(JSON.stringify(returnObj));

    return deferred.promise;
}

module.exports = {
    serialize: serialize
};