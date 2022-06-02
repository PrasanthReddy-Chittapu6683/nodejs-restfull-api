const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Oders were fetched'
    })
})

router.post('/', (req, res, next) => {
    const orders = {

        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'Oders was Created',
        orderDetails: orders
    })
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(201).json({
        message: `Order ID: ${orderId}`
    })
})

router.patch('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(201).json({
        message: `Order Updated for ${orderId} !!!`
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: `Order Deleted ${req.params.orderId} !!!`
    })
})

module.exports = router;