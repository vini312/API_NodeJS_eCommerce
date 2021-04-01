const router = require("express").Router();
const productModel = require("../model/product");
const { productInfoValidation, productUpdateValidation } = require('../validation')

//Fetch all products from the database
router.get("/", (req, res) => {
    productModel.find()
        .then(allProductsList=>
            res.json(allProductsList)
        )
        .catch(err=>res.json({ message: `Error when finding all from database ${err}` }));
});

//Fetch all best sellers products from the database
router.get("/bestsellers", (req, res) => {
    productModel.find({bestSeller:true})
        .then(bestSellers=>{
            //filter the information necessary
            const bestSellersList = bestSellers.map(bestSeller=>{
                return {
                    _id:bestSeller._id,
                    name: bestSeller.name,
                    image: bestSeller.image,
                    price: bestSeller.price,
                    category: bestSeller.category,
                    bestSeller: bestSeller.bestSeller,
                    quantity: bestSeller.quantity,
                    description: bestSeller.description
                }
            });
            res.json(bestSellersList)}
        )
        .catch(err=>res.json({ message: `Error when finding Best Sellers from database ${err}` }));
});

//Fetch a product by id
router.get("/:id", (req, res)=>{

    productModel.findById(req.params.id)
        .then(product=>
            res.json(product)
        )
        .catch(err=>res.json({ message: `Error when finding by id from database ${err}` }));
});

//Update a product by id
router.put("/:id", (req, res)=>{

    //First check if the product exists, then use it to store the current values
    productModel.findById(req.params.id)
        .then(product=>{
            
            //Stores the validation object
            const validation = productUpdateValidation(req.body);
            // if error is not null the validation fails
            if (validation.error)
                return res.status(400).send(validation.error.details[0].message);

            productPut = {
                //Using the OR operator makes it use the product variable when req.body is null
                // this avoids update to null when a property is missing
                name: req.body.name || product.name,
                price: req.body.price || product.price,
                category: req.body.category || product.category,
                bestSeller: req.body.bestSeller || product.bestSeller,
                quantity: req.body.quantity || product.quantity,
                description: req.body.description || product.description,
                image: (req.body.image? `/img/products/${req.body.image}` : product.image)
            }

            productModel.updateOne({ _id: req.params.id }, productPut)
                .then(()=>
                res.json({message: `product ${req.params.id} successfully updated`})
                )
                .catch(err=>res.json({ message: `Error updating product on database ${err}` }));
        })
        .catch(err=>res.json({ message: `Error when finding by id from database ${err}` }));
});

//Crate a product
router.post("/", (req, res)=>{

    //Stores the validation object
    const validation = productInfoValidation(req.body);
    // if error is not null the validation fails
    if (validation.error)
        return res.status(400).send(validation.error.details[0].message);

    const newProduct = new productModel({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        bestSeller: req.body.bestSeller,
        quantity: req.body.quantity,
        description: req.body.description
    });

    newProduct.save()
        .then(()=>
            res.json({ message: `new product: ${newProduct._id} successfully added` })
        )
        .catch(err=>res.json({ message: `Error creating product on database ${err}` }));
});

module.exports = router;