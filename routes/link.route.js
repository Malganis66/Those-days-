import {Router} from 'express'
import { updateLink } from '../controllers/link.controller.js'
import { createLink, getLink, getLinks, removeLink } from '../controllers/link.controller.js'
import { requireToken } from '../middlewares/requireToken.js'
import { bodyLinkValidator, paramLinkValidator } from '../middlewares/validationresultauth.js'
const router = Router()

router.get('/',requireToken,getLinks)
router.get("/:nanoLink",getLink)
router.post('/',requireToken,bodyLinkValidator,createLink)
router.delete("/:id",requireToken,paramLinkValidator,removeLink)
router.patch("/:id",requireToken,paramLinkValidator,bodyLinkValidator,updateLink)

export default router
