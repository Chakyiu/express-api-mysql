const express = require("express");
const app = express();
const router = require("./clinic/clinic.contronller");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/clinic", router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
