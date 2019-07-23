import express from "express";

const port = 3001;

const app = express();

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log("App is listening on port " + port));

const larp = async () => {
  return 0;
};
