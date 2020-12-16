const router = require('express').Router();
const { Category, Product } = require('../../models');
const { json } = require('sequelize/types');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
  const categoryData =await Category.findAll({ include: Product}) 
  
  res.status(200).json(categoryData)
  console.log(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const categoryData =await Category.findByPK(req.params.id, {
      include: Product
    });
    if (!categoryData) {
      res.status(404).json({message: 'sorry,no category with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.status(200).json(categoryData);
return res.jason(categoryData);
  // create a new category
});


router.put('/:id', (req, res) => {
try{
  const categoryData= await Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  if(!categoryData[0]) {
    res.staus(404).json({ message: 'no category with this id'});
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
