const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

require('dotenv').config();

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const API_SERVICE_URL = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_SERVER : process.env.DEVELOPMENT_SERVER;

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.APP_PRODUCTION_URL : process.env.APP_DEVELOPMENT_URL,
  optionsSuccessStatus: 200
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors(corsOptions));

// Proxy endpoints
app.use('*', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
