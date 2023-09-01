const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
    //   port : 3306,
      user : 'frans',
      password : '',
      database : 'baumaschinen-shop-api'
    }
  });

db.select('*').from('products').then(data => {console.log(data)});
const app = express();

app.use(cors());
app.use(express.json());


// app.use(bodyParser.json());


// const database = {
//     products: [
//         {
//             id: '1',
//             title: 'Bagger',
//             description: 'Das ist ein Bagger. Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger',
//             source: 'https://images.unsplash.com/photo-1590834367872-3297c46273ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
//             rentingPrice: '50',
//             sellingPrice: '2000'
//         },
//         {
//             id: '2',
//             title: 'Bagger',
//             description: 'Das ist ein Bagger. Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger',
//             source: 'https://images.unsplash.com/photo-1590834367872-3297c46273ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
//             rentingPrice: '50',
//             sellingPrice: '2000'
//         },
//         {
//             id: '3',
//             title: 'Säge',
//             description: 'Das ist ein Bagger. Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger  Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger Bagger',
//             source: 'https://images.unsplash.com/photo-1590834367872-3297c46273ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
//             rentingPrice: '50',
//             sellingPrice: '2000'
//         }
//     ]
// }

app.get('/', (req, res) => {
    db.select('*')
    .from('products')
    .then(products => {
        res.json(products[0]);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        res.status(500).json('Error fetching products');
    });
})

const port = 3000;
app.listen(port, () => {
    console.log("app is running on ", port)
})

app.get('/products', (req, res) => {
    db.select('*')
    .from('products')
    .then(products => {
        res.json(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        res.status(500).json('Error fetching products');
    });
})

app.post('/signin', (req, res) => {
    const {password} = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    //     console.log(err);
    // });

    
    if (bcrypt.compareSync(password, "$2a$10$xMBchJDkwyrYxAQGxKvmNu75Vg6QkmLPEOJzy6UmNvfCpwGwWTCSO")) {
        res.json(true);
        res.status(200)
    } else{res.json(false);res.status(400)}
})

app.get('/product/:id', (req, res) => {
    const itemId = req.params.id;

    db.select('*')
    .from('products')
    .where({id: itemId})
    .then(product => {
        res.json(product[0]);
    })
    .catch(error => {
        console.error('Error fetching product:', error);
        res.status(500).json('Error fetching product');
    });
});


app.get('/topproducts', (req, res) => {
    db.select('*')
    .from('products')
    .where({favorite: true})
    .then(products => {
        res.json(products);
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        res.status(500).json('Error fetching products');
    });
})

// app.post('/signin', (req, res) => {
//     if (req.body.password === 'lorbas'  ) {
//         res.status(200)
//     } else {
//         res.status(400).json('error logging in')
//     }
// })

app.post('/addproduct', (req, res) => {
    const {title, source, favorite, rentingprice, sellingprice, description} = req.body;
    db('products').insert({
        title: title,
        description: description,
        source: source,
        favorite: favorite,
        rentingprice: rentingprice,
        sellingprice: sellingprice
    })
    .returning('*')
    .then(product => {
        res.json(product[0]); // Return the inserted product
    })
    .catch(error => {
        console.error('Error adding product:', error);
        res.status(500).json('Error adding product');
    });
})

app.post('/addfavorite', (req, res) => {
    const {id, status} = req.body;
    db.select('*').from('products').where({id})
    .update({
        favorite: status
      })
    .then(product => {
        res.json(product); // Return the inserted product
    })
    .catch(error => {
        console.error('Error changing favorite:', error);
        res.status(500).json('Error changing favorite');
    });
})
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; // Extract the id from the URL parameter
    db('products')
      .where({ id })
      .del()
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        res.status(500).json('Error deleting item');
      });
});
app.put('/favorite/:id', (req, res) => {
    const id = req.params.id; // Extract the id from the URL parameter
    db('products')
      .where({ id })
      .update({favorite: req.body.favorite})
      .then(() => {
        res.status(204).send();
        console.log(req.body.favorite)
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        res.status(500).json('Error deleting item');
      });
});

  

// !!! 
// TODO: 
// ? Products list: GET products from database
// ? Products Home: GET top 4 products for Home page
// * Product Details Page: GET product details from database
// ? Add Product: POST product to database
// * delete Product: PUT product to database
// !!! 
