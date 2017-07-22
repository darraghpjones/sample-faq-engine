const config = {};

config.mongodb = {};
config.server = {};

config.server.port = process.env.WEB_PORT || 30000;

config.mongodb.username = process.env.MONGODB_USERNAME || null;
config.mongodb.password= process.env.MONGODB_PASSWORD || null;
config.mongodb.host= process.env.MONGODB_HOST || 'localhost';
config.mongodb.port = process.env.MONGODB_PORT || 27017;
config.mongodb.databaseName = process.env.MONGODB_NAME || 'faq';

module.exports = config;