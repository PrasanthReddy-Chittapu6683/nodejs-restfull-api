const expressApp = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = expressApp();



/** morgan is using to log the incoming requests */
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
""

mongoose.connect("mongodb+srv://node-shop:" + process.env.MONGO_ATLAS_PW + "@node-rest-shop.bjl4m.mongodb.net/?retryWrites=true&w=majority", function (err, db) {
    if (err) {
        throw err;
        db.close();
        console.log('DB connection closed !!!')
    }
    console.log("Database created!");
    // 
})

/** To handle CORS errors */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Reqested-Width, Content-Type, Accept, Athorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200), json({})
    }
    next()
})

const productsRoutes = require('./api/routes/products')
const ordersRoute = require('./api/routes/orders');
const { json } = require('express/lib/response');

/** use is a middleware an incoming request has to go throught */
app.use('/products', productsRoutes);
app.use('/orders', ordersRoute);


/** For Error handling */
app.use((req, res, next) => {
    const error = new Error('Not Found !!!')
    error.status = 404
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: `${error.message} Heyy`
        }
    })
});

module.exports = app;