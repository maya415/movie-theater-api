//using express module to create app object
const express = require('express');
const { db } = require('./db/db');
const main = require('./db/main');
const seed = require('./db/seed');
const { showRouter } = require('./routes/show');
const { userRouter } = require('./routes/user');
const app = express();



//setting the port and the host:
const port = process.env['port'] || 5001;
const host = process.env['host'] || 'localhost';


//linking routes:

app.use('/user', userRouter),
app.use('/show', showRouter)

app.use(express.json());

app.listen(port, async()=>{
    seed();
    main(); 
    console.log(`listening on port ${port}`)

})