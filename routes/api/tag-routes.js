const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags + associated Product data
  try {
    const tagInfo = await Tag.findAll({ include: { model: Product }})
      res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` + associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, { include: { model: Product, through: ProductTag } });

    if (!tagInfo) {
      res.status(404).json({ message: 'Tag not found! No categories are listed by this id.' });
      return;
    }

    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

});

module.exports = router;
