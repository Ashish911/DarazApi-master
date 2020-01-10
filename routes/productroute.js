const express = require('express');
const Product = require('../models/products');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();



//get all the products or items list
router.get('/list',(req,res)=>{
    Product.find({}).then((productList)=>{
        res.send(productList);
    }).catch((e)=>{
        res.send(e);
    })
});

//path to store image
const storage = multer.diskStorage({
    destination: "./upload/productlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

//post products or items
router.post('/save',upload.single('Image'),(req,res)=>{
    let newProduct = new Product({
        Description:req.body.Description,
        Price:req.body.Price,
        Image:req.file.filename
    });
    newProduct.save().then((productDoc)=>{
        res.send(productDoc);
    });
});

//get single products or items by id
router.patch('/product/:productId',upload.single('imageFile'),(req, res) => {
    // We want to upload a image in a product specified by productId
    Product.findOne({
        _id: req.params.productId
    }).then((product) => {
        if (product) {
            // product object with the specified conditions was found
            return true;
        }
        // else - the product object is undefined
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Product.findOneAndUpdate({
                    _id: req.params.productId
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'product updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports=router;
// module.exports=uploadRouter;