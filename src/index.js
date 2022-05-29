const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use('/static', express.static('public'));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
})); // hbs is the extension as well

app.set('view engine', 'hbs'); // change the view engine
app.set('views', './src/views'); // give the hbs the path to views // fixed in package json node start

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => console.log('App is listening on port 5000....'));