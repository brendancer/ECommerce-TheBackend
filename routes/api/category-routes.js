const router = require("express").Router();
const { Category, Product } = require("../../models");
//const { json } = require("sequelize/types");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.status(200).json(categoryData);
    console.log(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPK(req.params.id, {
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: "sorry,no category with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post("/", async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.status(200).json(categoryData);
  return res.json(categoryData);
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.staus(404).json({ message: "sorry, no category with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "sorry, no category with that id" });
      return;
    }
    res.status(200).json(categoryData);
    console.log("category has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
