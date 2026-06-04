import Joi from "joi";

export const createOrderValidation = (req, res, next) => {
    const schema = Joi.object({
        shippingAddress: Joi.object({
            street: Joi.string()
                .trim()
                .min(3)
                .max(100)
                .required()
                .warning('Street is required and must be between 3 and 100 characters'),

            city: Joi.string()
                .trim()
                .min(2)
                .max(50)
                .required()
                .warning('City is required and must be between 2 and 50 characters'),

            state: Joi.string()
                .trim()
                .min(2)
                .max(50)
                .required()
                .warning('State is required and must be between 2 and 50 characters'),

            pincode: Joi.string()
                .pattern(/^[0-9]{6}$/)
                .required()
                .warning('Pincode is required and must be a 6-digit number'),

            country: Joi.string()
                .trim()
                .min(2)
                .max(50)
                .required()
                .warning('Country is required and must be between 2 and 50 characters')
        }).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};
