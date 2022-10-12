import { nanoid } from 'nanoid'
import {Link} from '../models/Link.js'

export const getLinks = async(req,res)=>{
    try {
        const links = await Link.find({uid: req.uid})

        res.json({links})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error del server"})
    }
}

export const getLink = async(req,res)=>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: "no existe el link"})

        if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: "its not your id"})
        }
        res.json({link})
    } catch (error) {
        console.log(error)
        if(error.kind === "ObjectId"){
        return res.status(403).json({error: "formato id invalido"})
        }
        return res.status(500).json({error: "error del server"})
    }
}

export const createLink = async(req,res)=>{
    try {
        let {longLink} = req.body
        if(!longLink.startsWith("https://")){
            longLink = "https://" + longLink
            }
        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        const newLink = await link.save()
        
        return res.status(201).json({newLink})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error del server"})
    }
}

export const removeLink = async(req,res)=>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: "no existe el link"})

        if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: "its not your id"})
        }
        await link.remove()
        res.json({link})
    } catch (error) {
        console.log(error)
        if(error.kind === "ObjectId"){
        return res.status(403).json({error: "formato id invalido"})
        }
        return res.status(500).json({error: "error del server"})
    }
}

export const updateLink = async(req,res)=>{
    try {
        const {id} = req.params
        const {longLink} = req.body
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({error: "no existe el link"})

        if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: "its not your id"})
        }
        link.longLink = longLink
        await link.save()
        res.json({link})
    } catch (error) {
        console.log(error)
        if(error.kind === "ObjectId"){
        return res.status(403).json({error: "formato id invalido"})
        }
        return res.status(500).json({error: "error del server"})
    }
}
