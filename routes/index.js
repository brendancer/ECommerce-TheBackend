const router = require("express").Router();
const apiRoutes = require("./api");
const categoryRoutes = require("./api/category-routes");
const tagRoutes = require("./api/tag-routes");
const productRoutes = require("./api/product-routes");

router.use("/api", apiRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/tags", tagRoutes);
router.use("/api/products", productRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
