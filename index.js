const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const projDb = require('./data/helpers/projDb')
const actionDb = require('./data/helpers/actionDb')
const server = express();

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());

server.get('/projects', (req, res) => {
    projDb
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => res.status(500).json(err));
})

server.get('/projects/:id', (req, res) => {
    const id = req.params.id
    projDb
        .get(id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => res.status(500).json(err));
})

server.post('/projects', (req, res) => {
    let project = req.body;

    projDb
        .insert(project)
        .then(res.status(200).json(project))
        .catch(err => res.status(501).json(err))
})

server.put('/projects/:id', (req, res) => {
    let id = req.params.id;
    let project = req.body;
    projDb
        .update(id, project)
        .then(result => {
            if (!result) { throw new Error('Bad id') }
            else { res.status(200).json(result) }
        })
        .catch(err => res.status(501).json(err.message))
})

server.delete('/projects/:id', (req, res) => {
    let id = req.params.id;

    projDb
        .remove(id)
        .then(result => {
            if (!result) { throw new Error('Bad Id') }
            else { res.status(200).send('Success') }
        })
})


//BEGIN ACTIONS
server.get('/actions', (req, res) => {
    actionDb
        .get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => res.status(500).json(err));
})

server.get('/actions/:id', (req, res) => {
    const id = req.params.id
    actionDb
        .get(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => res.status(500).json(err));
})

server.post('/actions', (req, res) => {
    let action = req.body;

    actionDb
        .insert(action)
        .then(res.status(200).json(action))
        .catch(err => res.status(501).json(err))
})

server.put('/actions/:id', (req, res) => {
    let id = req.params.id;
    let action = req.body;
    actionDb
        .update(id, action)
        .then(result => {
            if (!result) { throw new Error('Bad id') }
            else { res.status(200).json(result) }
        })
        .catch(err => res.status(501).json(err.message))
})

server.delete('/actions/:id', (req, res) => {
    let id = req.params.id;

    actionDb
        .remove(id)
        .then(result => {
            if (!result) { throw new Error('Bad Id') }
            else { res.status(200).send('Success') }
        })
})


server.listen(8000, () => console.log('API running on port 8000... *.*'));