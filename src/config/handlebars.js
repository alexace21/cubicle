const handlebars = require('express-handlebars');

module.exports = (app) => {

    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    })); // hbs is the extension as well
    
    app.set('view engine', 'hbs'); // change the view engine
    app.set('views', './src/views'); // give the hbs the path to views // fixed in package json node start
}; // Default Exports

