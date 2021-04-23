const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({ include: { model: Product }});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, { include: { model: Product }});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create
  } catch (err) {

  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

  } catch (err) {

  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {

  } catch (err) {

  }

});

module.exports = router;
