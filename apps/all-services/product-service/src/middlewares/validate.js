export const validate = (schema, property = "body") => (req, res, next) => {

    const data = req[property];

    const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map(err => err.message)
        });
    }

    req[property] = value;
    next();
};