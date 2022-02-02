const express = require('express');
const {Pool} = require('pg');

const app = express();
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'codeyourfuture',
  password: 'codeyourfuture',
  database: 'cyf_ecommerce',
});

//Add a new GET endpoint `/customers` to return all the customers from the database:
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        if(error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);
        }
    })
});

//Add a new GET endpoint `/suppliers` to return all the suppliers from the database:
app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});

//Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names:
const productsSelectQuery =  SELECT product_name, supplier_name, unit_price FROM products INNER JOIN product_availability
ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;


app.get('/products', (req, res) => {
  pool.query( productsSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});
app.listen(5000, () => {
    console.log("server has started on port 5000");
})