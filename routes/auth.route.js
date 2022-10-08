import {Router} from 'express'
import {body} from 'express-validator'
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controller.js'
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js'
import { requireToken } from '../middlewares/requireToken.js'
import { validationResultauth } from '../middlewares/validationresultauth.js'
const router = Router()

router.post("/register",[
    body("email","formato de email invalido").trim().isEmail().normalizeEmail(),
    body("password","Minimimo de 6 caracteres").trim().isLength({ min: 5 }),
    body("password","formato de password invalido").custom((value, {req})=>{
        if(value !== req.body.repassword){
            throw new Error("no coinciden las passwords")
        }
        return value
    })
],validationResultauth,register)

router.post("/login",[
    body("email","formato de email invalido").trim().isEmail().normalizeEmail(),
    body("password","formato de password invalido").trim().isLength({ min: 5 })
],validationResultauth,login)

router.get("/protected",requireToken,infoUser)
router.get("/refresh",requireRefreshToken,refreshToken)
router.get("/logout",logout)

export default router