const router = require('express').Router();
const { Category, Product } = require('../../models');

//* The - /API/CATEGORIES - Endpoint *//

// find all categories + associated Products
router.get('/', async (req, res) => {
  try {
    const categoryInfo = await Category.findAll({ include: { model: Product } });
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value + associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryInfo = await Category.findByPk(req.params.id, { include: { model: Product }});
    if (!categoryInfo) {
      res.status(404).json({ message: 'Category not found! No categories are listed by this id.' });
      return;
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryInfo = await Category.create(req.body);
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryInfo = await Category.update(req.body, { where: { id: req.params.id }});
    if (!categoryInfo) {
      res.status(404).json({ message: 'Category not found! No categories are listed by this id.' });
      return;
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryInfo = await Category.destroy({ where: { id: req.params.id } });

    if (!categoryInfo) {
      res.status(404).json({ message: 'Category not found! No categories are listed by this id, or category has been deleted.' });
      return;
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
