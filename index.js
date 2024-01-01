require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Product = require('./models/product');
const port = 3000;


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

/**
 * database connections
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nathisamukelo90:mongodb2023@cluster0.irjuyqv.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('mongo connection open');
    })
    .catch((err) => {
        console.log('mongo error');
        console.log(err);
        //process.env.PROD_DB
    })

/**
 * setting up views
 *  */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/dogs', (req, res) => {
    res.send('woof');
});


/**
 * new Products
 */
const categories = ['fruit', 'vegetable', 'dairy'];
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})


/**
 * add the new Product into the database
 */
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

/**
 * quiring all the products
 */
app.get('/products', async (req, res) => {
    const Products = await Product.find({});
    res.render('products/index', { Products });
});


/**
 * quiring one product
 */
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})


/**
 * updating the product
 */
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})


app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

/**
 * deleting stuff
 */
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(port, () => {
    console.log(`listening to port ${port}`);
})
