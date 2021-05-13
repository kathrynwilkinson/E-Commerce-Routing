const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//* The - /API/TAGS - Endpoint *//

// find all tags + associated Product data
router.get('/', async (req, res) => {
  try {
    const tagInfo = await Tag.findAll({ include: { model: Product }})
      res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id` + associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.findByPk(req.params.id, { include: { model: Product, through: ProductTag } });

    if (!tagInfo) {
      res.status(404).json({ message: 'Tag not found! No tags are listed by this id.' });
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } });
    if (!tagInfo) {
      res.status(404).json({ message: 'Tag not found! No tags are listed by this id.' });
      return;
    } else {
      return res.status(200).json(tagInfo);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.destroy({ where: { id: req.params.id } });
    if (!tagInfo) {
      res.status(404).json({ message: 'Tag not found! No tags are listed by this id.' });
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
