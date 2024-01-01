const Product = require('./models/product');

/**
 * database connections
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ProductDB')
    .then(() => {
        console.log('mongo connection open');
    })
    .catch((err) => {
        console.log('mongo error');
        console.log(err);
    })


/**
 * adding one product
 */
// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 7.33,
//     category: 'fruit'
// })

// p.save().then(() => {
//     console.log(p);
// })
//     .catch(err => {
//         console.log('error: ', err);
//     })



/**
 * Adding many Products
 */
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelom',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log('error: ', e)
    })
