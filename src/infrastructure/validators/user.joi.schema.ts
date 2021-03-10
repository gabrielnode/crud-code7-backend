import * as joi from '@hapi/joi'
export const userJoiSchema = joi.object().keys({
    id: joi.number().optional(),
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    created_on: joi.date().iso().optional(),
    updated_on: joi.date().iso().optional(),
    activated: joi.boolean().optional()
})

export const userAuthJoiSchema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
})