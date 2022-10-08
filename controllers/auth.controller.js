import {User} from '../models/mongoModelUser.js'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    const {email,password} = req.body
    
    try {
        let user = await User.findOne({email})
        if(user) throw {code: 11000}
        user = new User({email,password})
        await user.save()

        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return res.status(400).json({error: "este user existe"})
        }
        return res.status(500).json({error: "error del servidor"})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = request.body
        let user = await User.findOne({email})
        if(!user) return res.status(403).json({error: "este user no existe"})

        const booleanPassword = await user.comparePassword(frontendPassword)
        if(!booleanPassword) return res.status(403).json({error: "password incorrecta"})

        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id,res)

        res.json({token, expiresIn})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error del servidor"})
    }
}

export const infoUser = async(req,res)=>{
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({email: user.email, uid: user.uid})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "fallo el server"})
    }
}

export const refreshToken = (req,res)=>{
    try {
        const {token,expiresIn} = generateToken(req.uid)
        res.json({token, expiresIn})
    } catch (error) {
        console.log(error)
    }
}

export const logout = (req,res)=>{
    res.clearCookie("refreshToken")
}