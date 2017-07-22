const config = require('./config');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: config.elasticsearch.host +":"+config.elasticsearch.port,
    log: config.elasticsearch.log
});

module.exports = {

    getClient: function () {
        return client;
    }
};