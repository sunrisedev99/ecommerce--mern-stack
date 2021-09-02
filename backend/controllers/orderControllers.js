import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc  create a new order
// @route GET /api/orders
// @access PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	} = req.body;

	if (orderItems && !orderItems.length) {
		res.status(401);
		throw new Error('No order items');
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

// @desc  get an order by id
// @route GET /api/orders/:id
// @access PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
	const reqOrder = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);
	if (reqOrder) {
		res.status(201).json(reqOrder);
	} else {
		res.status(401);
		throw new Error('Order not found');
	}
});
// @desc  update the order object once paid
// @route GET /api/orders/:id/pay
// @access PRIVATE
const updateOrderToPay = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.status(201).json(updatedOrder);
	} else {
		res.status(401);
		throw new Error('Order not found');
	}
});

export { addOrderItems, getOrderById, updateOrderToPay };