import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().trim().required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    birthday: Joi.date().required(),
});