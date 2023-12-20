const knex = require("knex")(require("../knexfile"));
const validator = require("validator");

const add = async (req, res) => {
  if (
    !req.body.address ||
    !req.body.city ||
    !req.body.contact_email ||
    !req.body.contact_name ||
    !req.body.contact_phone ||
    !req.body.contact_position ||
    !req.body.country ||
    !req.body.warehouse_name
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of missing properties in the request body",
    });
  }

  if (
    !validator.isEmail(req.body.contact_email) ||
    !validator.isMobilePhone(req.body.contact_phone)
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of invalid email address or phone number",
    });
  }

  try {
    const result = await knex("warehouses").insert(req.body);

    const newWarehouseId = result[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });

    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const warehouseData = warehousesFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};

const inventories = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }

  try {
    const inventories = await knex("inventories")
      .select({
        category: "category",
        id: "inventories.id",
        item_name: "item_name",
        quantity: "quantity",
        status: "status",
      })
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .where({ "warehouses.id": req.params.id });

    res.json(inventories);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

const update = async (req, res) => {
  if (
    !req.body.address ||
    !req.body.city ||
    !req.body.contact_email ||
    !req.body.contact_name ||
    !req.body.contact_phone ||
    !req.body.contact_position ||
    !req.body.country ||
    !req.body.warehouse_name
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of missing properties in the request body",
    });
  }

  if (
    !validator.isEmail(req.body.contact_email) ||
    !validator.isMobilePhone(req.body.contact_phone)
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of invalid email address or phone number",
    });
  }

  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedWarehouse[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  add,
  findOne,
  index,
  inventories,
  remove,
  update,
};
