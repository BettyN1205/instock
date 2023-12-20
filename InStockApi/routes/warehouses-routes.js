const router = require("express").Router();

const warehousesController = require("../controllers/warehouses-controller");

router
  .route("/")
  .get(warehousesController.index)
  .post(warehousesController.add);

router
  .route("/:id")
  .get(warehousesController.findOne)
  .delete(warehousesController.remove)
  .put(warehousesController.update);

router.route("/:id/inventories").get(warehousesController.inventories);

module.exports = router;
