const express = require('express')
const multer = require('multer')
const upload = multer()
const uploadCloud = require('../../middlewares/uploadCloud.middleware')
const validate = require('../../validates/account.validate')

const router = express.Router()
const controller = require('../../controller/admin/account.controller')
router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create',
    upload.single('thumbnail'),
    validate.createPost,
    uploadCloud.upload,
    controller.createPost)


module.exports = router;