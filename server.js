const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const Users = require('./models/user.model');
const Tasks = require('./models/task.model');

const app = express();

// Router
const authRouter = require('./routes/api/auth');
const taskRouter = require('./routes/api/task');
const userRouter = require('./routes/api/user');

// Middleware
const auth = require('./routes/middleware/auth');
const headers = require('./routes/middleware/headers');
const logger = require('./routes/middleware/logger');

mongoose.connect(
    `mongodb+srv://${config.dblogin}:${config.dbpassword}@jira-app-l985r.mongodb.net/${config.dbname}`,
    {useNewUrlParser: true}
);

app.options('*', cors());
app.use(express.json());
app.use(headers);
app.use(logger);

app.use('/api', authRouter);
app.use('/api', userRouter);

app.use(auth);

app.use('/api', taskRouter);

app.listen(process.env.PORT || config.port);
console.log(`Server runs on port ${process.env.PORT || config.port}`);
