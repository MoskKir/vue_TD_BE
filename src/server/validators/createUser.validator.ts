import Joi from "@hapi/joi";

const createUserSchema: Joi.ObjectSchema = Joi.object({
    login: Joi.string()
        .min(2)
        .required()
        .trim(),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .min(2)
        .required()
        .trim(),

    password: Joi.string()
        .min(3)
        .required()
        .trim()
});


export default createUserSchema;