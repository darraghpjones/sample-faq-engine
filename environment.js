const environment = {};

environment.server = {};
environment.server.port = process.env.WEB_PORT || 30000;

environment.mongodb = {};
environment.mongodb.username = process.env.MONGODB_USERNAME || null;
environment.mongodb.password= process.env.MONGODB_PASSWORD || null;
environment.mongodb.host= process.env.MONGODB_HOST || 'localhost';
environment.mongodb.port = process.env.MONGODB_PORT || 27017;
environment.mongodb.databaseName = process.env.MONGODB_NAME || 'faq';

environment.elasticsearch = {};
environment.elasticsearch.host = process.env.ELASTICSEARCH_HOST || 'localhost';
environment.elasticsearch.port = process.env.ELASTICSEARCH_PORT || 9200;
environment.elasticsearch.log = process.env.ELASTICSEARCH_LOG || 'trace';

module.exports = environment;