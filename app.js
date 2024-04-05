const express = require("express");
const cors = require("cors");
const v1 = require("./routes/v1/index");

const swaggerUI = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");

const file = fs.readFileSync("./api-docs.yaml", "utf-8");
const swaggerDocument = yaml.parse(file);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1", v1);

app.listen(port, () => {
  console.log("Running On Port", port);
});
