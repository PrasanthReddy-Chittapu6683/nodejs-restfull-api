const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id') // This is used to filter the sepecific data from DB
        .exec().then(docs => {
            console.log(docs)
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        Product_id: doc._id,
                        Name: doc.name,
                        Price: doc.price
                    }
                })
            }
            res.status(200).json({
                message: 'Handlge GET request for /products',
                data: response
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'No data available !!!',
                error: err
            })
        })

})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then((result) => {
            console.log(result)
            res.status(200).json({
                message: `Added New Product `,
                createdProduct: {
                    Product_id: result._id,
                    Name: result.name,
                    Price: result.price
                }
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(200).json({
                message: 'Handlge POST request for /products',
                error: err
            })
        });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id') // This is used to filter the sepecific data from DB
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                const response = {
                    products: {
                        Product_id: doc._id,
                        Name: doc.name,
                        Price: doc.price
                    }

                }
                res.status(200).json({
                    message: 'Data fetched successfully !!',
                    data: response
                })
            } else {
                res.status(404).json({
                    message: 'No data found !!',
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Data fetched FAILED !!',
                error: err
            })
        })
})

router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const udpateOps = {}
    for (const ops of req.body) {
        udpateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, {
        $set: udpateOps
    }).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Updated Product!!',
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error Updated Product!!'
        })
    })


})

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Product Deleted!!',
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: ' Deleted Failed !!',
            data: err
        })
    })
    // res.status(200).json({
    //     message: 'Product Deleted!!'
    // })
})




module.exports = router;