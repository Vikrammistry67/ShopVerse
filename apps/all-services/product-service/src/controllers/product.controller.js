import mongoose from 'mongoose';
import productModel from '../models/product.model.js';
import { uplaodImage } from '../services/imagekit.service.js'


export async function createProduct(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency = 'INR' } = req.body;
        const seller = req.user.id; // Extract seller from authenticated user

        const price = {
            amount: Number(priceAmount),
            currency: priceCurrency,
        };

        const images = await Promise.all((req.files || []).map(file => uplaodImage({ buffer: file.buffer })));


        const product = await productModel.create({ title, description, price, seller, images });


        return res.status(201).json({
            message: 'Product created',
            data: product,
        });
    } catch (err) {
        console.error('Create product error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export async function getProducts(req, res) {

    const { q, minprice, maxprice, skip = 0, limit = 20 } = req.query;


    const filter = {}

    if (q) {
        filter.$text = { $search: q }
    }

    if (minprice) {
        filter['price.amount'] = { ...filter['price.amount'], $gte: Number(minprice) }
    }

    if (maxprice) {
        filter['price.amount'] = { ...filter['price.amount'], $lte: Number(maxprice) }
    }

    const products = await productModel.find(filter).skip(Number(skip)).limit(Math.min(Number(limit), 20));

    return res.status(200).json({ data: products });




};


export async function getProductById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await productModel.findById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ data: product });
}


export async function updateProduct(req, res) {

    const { id } = req.params;
    const sellerId = req.user.id;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await productModel.findOne({
        _id: id,
        seller: sellerId
    });


    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== sellerId) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own products' });
    }

    const allowedUpdates = ['title', 'description', 'price'];
    for (const key of Object.keys(req.body)) {
        if (allowedUpdates.includes(key)) {
            if (key === 'price' && typeof req.body.price === 'object') {
                if (req.body.price.amount !== undefined) {
                    product.price.amount = Number(req.body.price.amount);
                }
                if (req.body.price.currency !== undefined) {
                    product.price.currency = req.body.price.currency;
                }
            } else {
                product[key] = req.body[key];
            }

        }
    }
    await product.save();
    return res.status(200).json({ message: 'Product updated', product });
}


export async function deleteProduct(req, res) {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
    }

    const product = await productModel.findOne({
        _id: id,
    })

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own products' });
    }

    await productModel.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: 'Product deleted' });

}


export async function getProductsBySeller(req, res) {

    const seller = req.user

    const { skip = 0, limit = 20 } = req.query;

    const products = await productModel.find({ seller: seller.id }).skip(skip).limit(Math.min(limit, 20));

    return res.status(200).json({ data: products });
}


// for practice Only --->
// export async function deleteP(req, res) {
//     try {
//         const id = req.params.id;
//         const sellerId = req.user.id;

//         if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: 'Invalid product Id' });
//         const products = await productModel.findOne({ _id: id });

//         if (!products) res.status(404).json({ message: 'product not found' });

//         // check the seller is same who have creates this product

//         if (products.seller.toString !== sellerId) res.status(404).json({ message: 'you can delete only your own products  not found' });

// await product.remove();
//     } catch (error) {

//     }
// };