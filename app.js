const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//import
const v1 = require("./routes/v1/index");
app.use("/api/v1", v1);

app.listen(port, () => {
  console.log("Running On Port", port);
});
