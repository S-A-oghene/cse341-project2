const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'My Library API',
    description: 'An API for managing users and books in a library, with OAuth authentication.',
    version: '1.0.0'
  },
  host: isProduction ? 'cse341-project2-s4wq.onrender.com' : 'localhost:8080',
  schemes: isProduction ? ['https'] : ['http'],
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
