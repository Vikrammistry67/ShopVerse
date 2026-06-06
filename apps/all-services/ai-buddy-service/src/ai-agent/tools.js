import { tool } from '@langchain/core/tools';
import axios from 'axios';
import z from 'zod';


// search product Tool
export const searchProduct = tool(async ({ query, token }) => {

    try {
        const productResponse = await axios.get(`http://localhost:3001/api/products/${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return JSON.stringify(productResponse.data);
    } catch (error) {
        console.log(`TOOL ERROR : ${error}`);
        new Error('failed to search product by tool');
    };
},
    {
        name: 'searchProduct',
        description: 'Search for products based on query',
        schema: z.object(
            {
                query:
                    z.string()
                        .describe('the search query for products')
            },
        ),
    });


// add to cart product Tool
export const addProductToCart = tool(async ({ productId, token, qty = 1 }) => {
    const cartResponse = await axios.get(`http://localhost:3002/api/carts/add`,
        {
            productId,
            qty
        },
        {
            headers:
            {
                Authorization: `Bearer ${token}`
            },
        }
    );

    return JSON.stringify(cartResponse.data);
},

    {
        name: 'addProductToCart',
        description: 'Add a product to cart by product id and quantity',
        schema: z.object({
            productId: z.string().describe('the id of the product to be added to cart'),
            qty: z.number().describe('the quantity of the product to be added to cart').default(1)
        })
    });

