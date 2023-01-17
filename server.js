const app = require("./app");
const env = require("dotenv");

const port = process.env.DB_PORT || 8000;

/* Error handler middleware */
env.config();



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  next();
});

app.listen(port, () => {
  console.log(`Server listening on Port http://localhost:${port}`);
});
