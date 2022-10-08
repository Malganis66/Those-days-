import { validationResult } from 'express-validator';

export const validationResultauth = (req,res,next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
    return res.json({ errors: result.array()})
    }
    return next()
}
