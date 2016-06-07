'use strict';

var Q = require('q');
var request = require('request');
var config = require('./../../config.js');
var acSerializer = require('./../../serializers/autocomplete/autocompleteSerializer');

var requestOptions = {
    url: config.AUTOCOMPLETE_API_URL,
    qs: {
        lang: '',
        query: ''
    },
    method: 'GET'
};

// fetch results from the bby autocomplete api
function fetch(query, lang) {
    var deferred = Q.defer();

    // add query & lang to request options
    requestOptions.qs.query = query;
    requestOptions.qs.lang = lang;

    request(requestOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            acSerializer.serialize(query, body).done(function(openSearchResults) {
                deferred.resolve(openSearchResults);
            });
        } else {
            deferred.reject({
                error: error
            });
        }
    });

    return deferred.promise;
}

module.exports = {
    fetch: fetch
};