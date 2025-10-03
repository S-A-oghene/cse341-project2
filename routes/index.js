const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");

// router.use("/auth", require("./auth")); // Temporarily disabled for Part 1

// Integrate Swagger UI setup directly to avoid require issues
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/contacts", require("./contacts"));

// Root route should be last
router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.redirect("/api-docs");
});

module.exports = router;
