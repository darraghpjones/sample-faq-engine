const config = require('./config');
const mongoose = require('mongoose');
const Q = require('q');

mongoose.Promise = require('q').Promise;

const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.databaseName}`;
mongoose.connect(uri);

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

module.exports = {

    getTopicSchema: function () {
        return topicSchema;
    }
};