const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Library API",
    description:
      "An API for managing users and books in a library, with OAuth authentication.",
    version: "1.0.0",
  },
  host: "cse341-project2-s4wq.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
