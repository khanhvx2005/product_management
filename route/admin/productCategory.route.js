const express = require('express')
const multer = require('multer')
const upload = multer()
const router = express.Router()
const controller = require('../../controller/admin/productCategory.controller')
const validate = require('../../validates/product.validate')
const uploadCloud = require('../../middlewares/uploadCloud.middleware')
router.get('/' ,controller.index)
router.get('/create' ,controller.create)
router.post('/create' , 
    upload.single('thumbnail'),
        uploadCloud.upload,
        validate.create,
    controller.createPost)
module.exports = router;