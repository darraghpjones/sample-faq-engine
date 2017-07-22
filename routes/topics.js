const express = require('express');
const mongoose = require('mongoose');
const db = require('../db');

const TopicModel = mongoose.model('topic', db.getTopicSchema());

//
// routes

const router = express.Router();

router.get('/', (req, res) => {

    console.log("Retrieving all topics");

    TopicModel.find().then(doc => {
        res.json(doc);
    });
});

router.post('/', (req, res) => {

    console.log("Saving a new topic");

    const topic = {
        title: req.body.title,
        items: req.body.items,
    };

    const itemModel = new TopicModel(topic);

    itemModel.save((error, doc) => {
        if (error) {
            res.json(500, error);
            return;
        }
        res.json(201, doc);
    });
});

router.get('/:id', (req, res) => {

    console.log("Retrieving a topic");

    const id = req.params.id;

    TopicModel.find({_id: id}).then(doc => {
        res.json(doc);
    }).error(error => {
        res.json(500, {code: 'GENERIC_ERROR', message: error.message});
    })
});

router.put('/:id', (req, res) => {

    console.log("Updating an existing topic");

    const id = req.params.id;

    const topic = {
        title: req.body.title,
        items: req.body.items,
    };

    TopicModel.findOneAndUpdate({_id: id}, topic, {new: true}, (error, data) => {
        if (error) {
            res.json(500, {code: 'GENERIC_ERROR', message: error.message});
            return;
        }

        if (!data) {
            res.json(404, {code: 'TOPIC_NOT_FOUND', message: `Topic with id '${id}' not found`});
            return;
        }

        res.json(200, data);
    })
});

router.delete('/:id', (req, res) => {

    console.log("Deleting an existing topic");

    const id = req.params.id;

    TopicModel.findOneAndRemove({_id: id}, (error, data) => {
        if (error) {
            res.json(500, {code: 'GENERIC_ERROR', message: error.message});
            return;
        }

        if (!data) {
            res.json(404, {code: 'TOPIC_NOT_FOUND', message: `Topic with id '${id}' not found`});
            return;
        }

        res.sendStatus(204);
    })
});

module.exports = router;