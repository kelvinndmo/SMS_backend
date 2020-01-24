const express = require("express");
const app = express();
require("./db/mongoose");

const port = process.env.PORT || 3000;

//import routes
const authRoute = require("./routers/users");

app.use(express.json());

// route middlewares
app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
