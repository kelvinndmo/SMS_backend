const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://novak:novak254@sms-prm4b.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => {
    console.log("Database connected successfully...");
  }
);
