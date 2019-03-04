const path = require("path");
const express = require("express");
const intiSsr = require("./core/ssr");
const vars = require("./../config/vars");

const PORT = vars.port;
const app = express();

// const staticPath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, "../build") : path.resolve(__dirname, "../public")
const staticPath = path.resolve(__dirname, "../build")

app.use(express.static(staticPath));
app.disable('x-powered-by');

intiSsr(app);

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
