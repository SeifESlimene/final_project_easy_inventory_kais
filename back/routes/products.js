import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.post('/addProduct', (req, res) => {
  const { name, number, state, buyingPrice, price, description } = req.body;
  const ProductModel = new Product({
    name,
    number,
    state,
    buyingPrice,
    price,
    description,
  });
  ProductModel.save()
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.get('/salePage', (_, res) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.put('/updateProduct/:id', (req, res) => {
  const { id } = req.params;
  const { name, number, state, buyingPrice, price, description } = req.body;
  Product.findByIdAndUpdate(
    id,
    { name, number, state, buyingPrice, price, description },
    { useFindAndModify: false },
    (err, data) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      }
      Product.findById(id)
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    }
  );
});

router.delete('/deleteproduct/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.get('/GetProduct/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

export { router as products }