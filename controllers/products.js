const db = require("../config/database");
const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const product = new Product(title,description, price, imageUrl);
    product.save()
        .then(([rows])=>{
            res.status(201).send({message: "Product Created Successfully", "product": product});
        })
        .catch((err)=>{
            res.status(500).send({message: err.message});
        })
}

exports.getProducts = (req, res, next) => {
    const results = Product.list()
        .then(([rows]) => {
            return res.status(200).json(rows);
        })
        .catch((error)=>{
            return res.status(500).json({message: error.message});
        })
}

exports.getProductById = (req, res, next) => {
    const id = req.params.id;
    const result = Product.retrieve(id)
        .then(([rows, fieldData])=>{
            if(rows.length <= 0){
                return res.status(404).json({message:"Product Not Found"});
            }
            return res.status(200).json(rows);
        })
        .catch((error)=>{
            return res.status(500).json({message: error});
        })
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;
    const {title, description, price, imageUrl} = req.body;
    Product.update(id, title, description, price, imageUrl)
        .then(async(result)=>{
            if(result.affectedRows <= 0){
                return res.status(404).json({message:"Product Not Found"});
            }
            const product = await Product.retrieve(id);
            return res.status(200).send({message: "Product Updated Successfully", "product": product[0]});
        })
        .catch((error)=>{
            return res.status(500).json({message: error.message});
        })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    const result = Product.destroy(id)
        .then(([rows])=>{
            if(rows.affectedRows <= 0){
                return res.status(404).json({message:"Product Not Found"});
            }
            return res.status(202).json({message:"Product Deleted"});
        })
        .catch((error)=>{
            return res.status(500).json({message: error});
        })
}
