//using express module to create app object
const express = require('express');
const app = express();

//setting the port and the host:
const port = process.env['port'] || 5001;
const host = process.env['host'] || 'localhost';

