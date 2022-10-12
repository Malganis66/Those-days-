import axios from 'axios';
import { validationResult, body, param } from 'express-validator';

export const validationResultauth = (req,res,next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
    return res.json({ errors: result.array()})
    }
    return next()
}

export const paramLinkValidator = [
    param("id","formato de id invalido").trim().notEmpty().escape()
]

export const bodyLinkValidator = [
    body("longLink","formato link invaldo").trim().notEmpty()
    .custom(async value=>{
        try {
            if(!value.startsWith("https://")){
                value = "https://" + value
            }
            await axios.get(value)
            return value
        } catch (error) {
            // console.log(error);
            throw new Error('not found longLink 404')
        }
    }),
    validationResultauth
]
