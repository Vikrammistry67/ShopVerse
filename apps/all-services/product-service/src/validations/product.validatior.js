import Joi from "joi";

// 🔥 Common reusable validators
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
    "string.pattern.base": "Invalid ObjectId format"
});

const priceSchema = Joi.object({
    amount: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.min": "Price cannot be negative",
            "any.required": "Price is required"
        }),

    currency: Joi.string()
        .valid("USD", "INR")
        .default("INR")
});

// 🔥 Image schema (reusable)
const imageSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        "string.uri": "Invalid image URL",
        "any.required": "Image URL is required"
    }),

    thumbnail: Joi.string().uri().optional().messages({
        "string.uri": "Invalid thumbnail URL"
    }),

    id: Joi.string().required().messages({
        "any.required": "Image ID is required"
    })
});


// ✅ CREATE PRODUCT
export const createProductSchema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(100)
        .trim()
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title must not exceed 100 characters"
        }),

    description: Joi.string()
        .max(1000)
        .allow("", null)
        .messages({
            "string.max": "Description too long"
        }),

    price: priceSchema.required(),

    seller: objectId.required(),

    images: Joi.array().items(imageSchema).optional(),

    stock: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
            "number.base": "Stock must be a number",
            "number.min": "Stock cannot be negative"
        })

});


// ✅ UPDATE PRODUCT (VERY IMPORTANT 🔥)
export const updateProductSchema = Joi.object({

    title: Joi.string().min(3).max(100).trim(),

    description: Joi.string().max(1000).allow("", null),

    price: priceSchema,

    seller: objectId,

    images: Joi.array().items(imageSchema),

    stock: Joi.number().integer().min(0)

}).min(1); // 🔥 at least one field required


// ✅ QUERY VALIDATION (pagination + filters)
export const queryProductSchema = Joi.object({

    page: Joi.number().integer().min(1).default(1),

    limit: Joi.number().integer().min(1).max(100).default(10),

    minPrice: Joi.number().min(0),

    maxPrice: Joi.number().min(0),

    sortBy: Joi.string().valid("price", "createdAt"),

    order: Joi.string().valid("asc", "desc")

});