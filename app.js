const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
var cors = require("cors");

const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const permissionRoutes = require('./src/routes/permissionRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const whiteListedIPRoutes = require('./src/routes/whiteListedIPRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');



app.use(cors());
app.use(bodyParser.json());

app.use(cookieparser());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

// Routes managements
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/comment', commentRoutes);
app.use('/role', roleRoutes);
app.use('/permission', permissionRoutes);
app.use('/notification', notificationRoutes);
app.use('/whiteip', whiteListedIPRoutes);
app.use('/module', moduleRoutes);

app.get('/', (req, res) => {
  res.json({message: 'ok'});
});

module.exports = app;
