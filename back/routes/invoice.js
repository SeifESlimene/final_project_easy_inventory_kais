import express from 'express';
const router = express.Router();
import Invoice from '../models/invoice.js';
import authMiddleware from '../helpers/authmiddleware.js';

router.post('/addinvoice', authMiddleware, (req, res) => {
  const { idProducts, number, totalPrice, discount, vat, idUsers } = req.body;
  const invoiceModel = new Invoice({
    idProducts,
    number,
    totalPrice,
    discount,
    vat: 10,
    idUsers,
  });
  invoiceModel
    .save()
    .then((invoice) => res.json(invoice))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.get('/allinvoices', (_, res) => {
  Invoice.find()
    .populate('idUsers')
    .populate('idProducts')
    .then((invoices) => res.status(200).json(invoices))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.post('/postinvoice', (req, res) => {
  const InvoiceModel = new Invoice(req.body);
  InvoiceModel.populate('idUsers')
    .populate('idProducts')
    .save()
    .then((invoices) => {
      res.status(200).json(invoices);
    })
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.get('/getinvoice/:id', authMiddleware, (req, res) => {
  const { id } = req.params.id;
  Db.Invoice.findById(id)
    .then((invoices) => {
      Db.Product.find({ _id: { $in: invoices.idProducts } }).then(
        (Products) => {
          const Result = new Object({
            number: invoices.number,
            totalPrice: invoices.totalPrice,
            discount: invoices.discount,
            vat: invoices.vat,
            date: invoices.date,
            Products: Products,
          });
          res.status(200).json(Result);
        }
      );
    })
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.delete('/deleteinvoice/:id', (req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then((invoice) => res.json(invoice))
    .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
});

router.put('/updateinvoice', (req, res) => {
  const { id, idProduct, number, totalPrice, discount, vat } = req.body;
  Invoice.findByIdAndUpdate(
    id,
    {
      idProduct,
      number,
      totalPrice,
      discount,
      vat,
    },
    (err, _) => {
      if (err) {
        res.status(400).json({ errors: [{ msg: err }] });
      }
      Invoice.findById(id)
        .then((invoice) => res.status(200).json(invoice))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    }
  );
});

export { router as invoice }
