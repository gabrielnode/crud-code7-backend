import * as joi from '@hapi/joi'
export const debtsoiSchema = joi.object().keys({
    id: joi.number().optional(),
    user_id: joi.number().required(),
    user_name: joi.string().required(),
    motivation_debt: joi.string().required(),
    value: joi.string().required(),
    date_debt: joi.date().iso().optional(),
    updated_on: joi.date().iso().optional(),
    activated: joi.boolean().optional()
})

export const userAuthJoiSchema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
})