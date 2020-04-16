const express = require('express'),
     cors = require('cors'),
    path = require('path'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    { initRoutes } = require(path.join(__dirname, 'routes'));

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//     console.log(req.headers)
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//   });
app.use(express.static(path.join(__dirname, "resources/images")))
initRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => {
        app.listen(3000);
        console.log("Server is UP and Running: 3000");
    }
);
