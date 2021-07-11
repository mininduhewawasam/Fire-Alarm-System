const morgan = require('morgan');
const { logger } = require('./bootstrap/logger');
require('./commands');
const routes = require('./routes/api/routes');
const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

if (process.env.NODE_ENV === 'production') {

    app.use(
        express
            .Router()
            .use(routes)
            .use(express.static('client/build'))
            .use('*', function (req, res) {
                sendFile(
                    path.resolve(__dirname, '..', 'client', 'build', 'index.html')
                );
            })
    );
}
app.use(morgan('tiny'));
app.use(routes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
    logger.info(`server is started on port ${port}`)
);

module.exports = server;