const environment = require('./environment');
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
const Q = require('q');

//
// elastic search

const elasticSearchClient = new elasticsearch.Client(getElasticSearchConfig());

//
// mongodb

mongoose.Promise = require('q').Promise;
mongoose.connect(getMongoUri());

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    title: {type: String, required: true},
    items: [
        {
            question: {type: String, required: true},
            answer: {type: String, required: true}
        }
    ]
}, {collection: 'topics'});

//
// link

topicSchema.plugin(mongoosastic, {
    esClient: elasticSearchClient
});

const topicRepository = mongoose.model('topic', topicSchema);

//
// urls

function getMongoUri() {
    return `mongodb://${environment.mongodb.host}:${environment.mongodb.port}/${environment.mongodb.databaseName}`;
}

function getElasticSearchConfig() {
    return {
        host: environment.elasticsearch.host + ":" + environment.elasticsearch.port,
        log: environment.elasticsearch.log
    };
}

//
// exports

module.exports = {

    getTopicRepository: function () {
        return topicRepository;
    },

    getElasticSearchClient: function () {
        return elasticSearchClient;
    }
};