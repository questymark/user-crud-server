import express from 'express';
import bodyParser from 'body-parser';
import { serverPort } from '../etc/config.json';
import * as db from './utils/DataBaseUtils';
import cors from 'cors';

db.setupConnection();

const app = express();

app.use( bodyParser.json() );

app.use( cors({ origin: '*' }));

app.get('/users', (req, res) => {
  db.listUsers(req.query).then(data => res.send(data));
});

app.get('/users/:id', (req, res) => {
  db.getUser(req.params.id).then(data => res.send(data));
});

app.put('/users/:id', (req, res) => {
  db.updateUser(req.params.id, req.body).then(data => res.send(data));
});

app.post('/users', (req, res) => {
  db.createUser(req.body).then(data => res.send(data));
});

app.delete('/users/:id', (req, res) => {
  db.deleteUser(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, () => {
  console.log(`Server is up and running on port ${serverPort}`)
});