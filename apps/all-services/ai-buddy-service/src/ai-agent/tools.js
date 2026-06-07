import { tool } from '@langchain/core/tools';
import axios from 'axios';
import z from 'zod';


// search product Tool
export const searchProduct = tool(async ({ query, token }) => {
    console.log("searchProduct called with data:", { query, token })
    const productResponse = await axios.get(`http://localhost:3001/api/products?q=${query}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return JSON.stringify(productResponse.data);

}, {
    name: 'searchProduct',
    description: 'Search for products based on query',
    schema: z.object({
        query: z.string().describe("The search query for products")
    })
});


// add to cart product Tool
export const addProductToCart = tool(async ({ productId, token, qty = 1 }) => {
    try {
        const response = await axios.post(`http://localhost:3002/api/carts/add`, {
            productId,
            qty
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data?.message || `Added product with id ${productId} (qty: ${qty}) to cart`;
    } catch (error) {
        console.error('addProductToCart failed:', error?.response?.data || error.message || error);
        throw new Error(`Failed to add product to cart: ${error?.response?.data?.message || error.message || error}`);
    }

}, {
    name: "addProductToCart",
    description: "Add a product to the shopping cart",
    schema: z.object({
        productId: z.string().describe("The id of the product to add to the cart"),
        qty: z.number().describe("The quantity of the product to add to the cart").default(1),
    })
})


export default { searchProduct, addProductToCart }