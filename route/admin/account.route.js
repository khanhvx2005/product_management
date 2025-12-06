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
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,

    controller.createPost)
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch)
router.patch('/change-status/:id/:status', controller.changeStatus)
router.get('/detail/:id', controller.detail)
router.delete('/delete/:id', controller.deleteItem)


module.exports = router;