const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//* The - /API/PRODUCTS - Endpoint *//

// find all products + associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productInfo = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// find a single product by its `id` + associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productInfo = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }]
    });
    if (!productInfo) {
      res.status(404).json({ message: 'Product not found! No products are listed by this id.' });
      return;
    }
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  Product.update(req.body, {// update product data
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {// find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {// get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productInfo = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
  if (!productInfo) {
    res.status(404).json({ message: 'Product not found! No products are listed by this id.' });
    return;
  }
    res.status(200).json(productInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
