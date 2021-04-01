const Joi = require("@hapi/joi");

//Function to create a schema and validate user input for registration requirements
// returns the validation object
const registerValidation = user => {
        const schema = Joi.object({
                name: Joi.string()
                        .required(),
                email: Joi.string()
                        .required()
                        .email(),
                password: Joi.string()
                        .required()
                        .min(6)
                        .regex(/.*[!@#$%^&*]/) //To force use of at least one special character
        });

        return schema.validate(user);
};

//Function to create a schema and validate user input for login requirements
// returns the validation object
const loginValidation = user => {
        const schema = Joi.object({
                email: Joi.string()
                        .required()
                        .email(),
                password: Joi.string()
                        .required()
        });

        return schema.validate(user);
};

const productInfoValidation = prod => {
        const schema = Joi.object({
                name: Joi.string()
                        .required(),
                image: Joi.string()
                        .required(),
                price: Joi.number()
                        .required(),
                category: Joi.string()
                        .required(),
                category: Joi.string()
                        .required(),
                bestSeller: Joi.boolean()
                        .required(),
                quantity: Joi.number()
                        .required(),
                description: Joi.string()
                        .required()
        });

        return schema.validate(prod);
}

const productUpdateValidation = prod => {
        const schema = Joi.object({
                name: Joi.string(),
                image: Joi.string(),
                price: Joi.number(),
                category: Joi.string(),
                category: Joi.string(),
                bestSeller: Joi.boolean(),
                quantity: Joi.number(),
                description: Joi.string()
        });

        return schema.validate(prod);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productInfoValidation = productInfoValidation;
module.exports.productUpdateValidation = productUpdateValidation;