const express = require('express');
const config = require('../config');

const topicRepository = config.getTopicRepository();
const elasticSearchClient = config.getElasticSearchClient();

//
// routes

const router = express.Router();

router.get('/search', (req, res) => {

    console.log("Searching for topics");

    const term = req.query.term;

    elasticSearchClient.search({
        q: term
    }).then(function (body) {
        res.status(200).json(body.hits);
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    })
});

router.get('/', (req, res) => {

    console.log("Retrieving all topics");

    topicRepository.find().then(doc => {
        res.json(doc);
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    });
});

router.post('/', (req, res) => {

    console.log("Saving a new topic");

    const topic = {
        title: req.body.title,
        items: req.body.items,
    };

    const itemModel = new topicRepository(topic);

    itemModel.save().then(doc => {
        res.json(201, doc);
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    });
});

router.get('/:id', (req, res) => {

    console.log("Retrieving a topic");

    const id = req.params.id;

    topicRepository.findOne({_id: id}).then(doc => {

        if (!doc) {
            res.status(404).json({code: 'TOPIC_NOT_FOUND', message: `Topic with id '${id}' not found`});
            return;
        }

        res.json(doc);
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    })
});

router.put('/:id', (req, res) => {

    console.log("Updating an existing topic");

    const id = req.params.id;

    const topic = {
        title: req.body.title,
        items: req.body.items,
    };

    topicRepository.findOneAndUpdate({_id: id}, topic, {new: true}).then(doc => {

        if (!doc) {
            res.status(404).json({code: 'TOPIC_NOT_FOUND', message: `Topic with id '${id}' not found`});
            return;
        }

        res.json(doc);
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    })
});

router.delete('/:id', (req, res) => {

    console.log("Deleting an existing topic");

    const id = req.params.id;

    topicRepository.findOneAndRemove({_id: id}).then(doc => {

        if (!doc) {
            res.status(404).json({code: 'TOPIC_NOT_FOUND', message: `Topic with id '${id}' not found`});
            return;
        }

        res.status(204).json();
    }).catch(error => {
        res.status(500).json({code: 'GENERIC_ERROR', message: error.message});
    })
});

module.exports = router;