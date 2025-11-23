const express = require('express')
const multer = require('multer')
const upload = multer()
const router = express.Router()
const controller = require('../../controller/admin/productCategory.controller')
const validate = require('../../validates/product.validate')
const uploadCloud = require('../../middlewares/uploadCloud.middleware')
router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.create,
    controller.createPost)
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', upload.single('thumbnail'),
    uploadCloud.upload,
    validate.create, controller.editPatch)
router.patch('/change-status/:id/:status', controller.changeStatus)

module.exports = router;