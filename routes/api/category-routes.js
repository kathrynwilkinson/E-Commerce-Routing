const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories + associated Products
  try {
    const categoryInfo = await Category.findAll({ include: { model: Product }})
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value + associated Products
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryInfo = await Category.create(req.body);
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
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

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy({ where: { id: req.params.id } });

    if (!categoryInfo) {
      res.status(404).json({ message: 'Category not found! No categories are listed by this id, or category has been deleted.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
