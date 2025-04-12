const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Статичні файли
app.use(express.static('public'));

// Handlebars + хелпери
const hbs = exphbs.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    formatText: (text) => text.toUpperCase(),
    formatDate: (date) => new Date(date).toLocaleDateString('uk-UA'),
    isEqual: (a, b, options) => (a === b ? options.fn(this) : options.inverse(this)),
    year: () => new Date().getFullYear()
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Домашня сторінка
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Головна',
    message: 'Ласкаво просимо!',
    isLoggedIn: true,
    items: ['Книга', 'Ноутбук']
  });
});

// Сторінка кошика
app.get('/cart', (req, res) => {
  const cart = [
    { id: 1, name: 'Мишка', price: 150 },
    { id: 2, name: 'Клавіатура', price: 300 }
  ];
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  res.render('cart', {
    title: `Кошик (${cart.length} товарів)`,
    cart,
    total
  });
});

// Сервер
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
