require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user-router");
const employeeRouter = require("./routers/employee-router");

const app = express();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(employeeRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(404).send({
    message: "Service is currently under progress",
  });
});

/**
 * DEFAULT ROUTE.
 */
app.get("*", (req, res) => {
  res.status(404).send({
    error: "NO SUCH ENDPOINT",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
