const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    try {
        const tagsData = await Tag.findAll({
            // be sure to include its associated Product data
            include: [{ model: Product }]
        });
        res.status(200).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    try {
        const tagsData = await Tag.findByPk(req.params.id, {
            // be sure to include its associated Product data
            include: [{ model: Product }]
        });
        res.status(200).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const tagsData = await Tag.create(req.body);
        res.status(200).json(tagsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    // Updates a tag's name by its `id` value.
    try {
        const tagData = await Tag.update(req.body, {
            where: { id: req.params.id },
        });
        if (!tagData) {
            res
                .status(404)
                .json({ message: "No category was found with the specified id." });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    // Delete a tag by its `id` value
    try {
        const deletedTag = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });

        if (deletedTag === 0) {
            return res.status(404).json({ message: "No tag exists with this ID." });
        }

        res.status(200).json({ message: "Tag deleted successfully." });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;