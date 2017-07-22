const config = {};


config.server = {};
config.server.port = process.env.WEB_PORT || 30000;

config.mongodb = {};
config.mongodb.username = process.env.MONGODB_USERNAME || null;
config.mongodb.password= process.env.MONGODB_PASSWORD || null;
config.mongodb.host= process.env.MONGODB_HOST || 'localhost';
config.mongodb.port = process.env.MONGODB_PORT || 27017;
config.mongodb.databaseName = process.env.MONGODB_NAME || 'faq';

config.elasticsearch = {};
config.elasticsearch.host = process.env.ELASTICSEARCH_HOST || 'localhost';
config.elasticsearch.port = process.env.ELASTICSEARCH_PORT || 9200;
config.elasticsearch.log = process.env.ELASTICSEARCH_LOG || 'trace';

module.exports = config;