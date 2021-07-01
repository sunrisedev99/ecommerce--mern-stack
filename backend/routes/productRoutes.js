import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({});
		res.json(products);
	})
);

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) res.json(product);
		else {
			// throw a custom error so that our error middleware can catch them and return apt json
			res.status(404);
			throw new Error('Product not found');
		}
	})
);

export default router;
