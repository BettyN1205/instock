const knex = require("knex")(require("../knexfile"));
const router = require('express').Router();

const add = async (req, res) => {
  if (
    !req.body.category ||
    !req.body.description ||
    !req.body.item_name ||
    !req.body.quantity ||
    !req.body.status ||
    !req.body.warehouse_id
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of missing properties in the request body",
    });
  }

  if (!Number.isInteger(req.body.quantity)) {
    return res.status(400).json({
      message: "quantity is not a number",
    });
  }

  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });

    if (warehousesFound.length === 0) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.body.warehouse_id}`,
    });
  }

  try {
    const result = await knex("inventories").insert(req.body);

    const newInventoryId = result[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryId,
    });

    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory: ${error}`,
    });
  }
};

const findOne = async (req, res, next) => {
  try {
    const inventoryId = parseInt(req.params.id);

    if (isNaN(inventoryId)) {
      return res.status(400).json({
        message: "Invalid inventory ID format",
      });
    }

    const inventoryData = await knex("inventories")
      .select('inventories.*', 'warehouses.warehouse_name')
      .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
      .where('inventories.id', inventoryId)
      .first();

    if (!inventoryData) {
      return res.status(404).json({
        message: `Inventory with ID ${inventoryId} not found`,
      });
    }

    res.status(200).json(inventoryData);
  } catch (error) {
    next(error);
  }
};


const index = async(_req,res)=>{
  try {
      const data = await knex('inventories')
      .select('inventories.*', 'warehouses.warehouse_name')
      .join('warehouses', function () {
        this.on('inventories.warehouse_id', '=', 'warehouses.id');
      });
      res.status(200).json(data);
      
  } catch (error) {
      res.status(400).send(`Error retrieving Inventories: ${error}`)
  }
}



// async function findOne(req, res) {
//   try {
//       const itemId = req.params.id;
//       console.log(itemId);
//       const itemInventory = await knex('inventories')
//           .select('inventories.*')
//           .where('inventories.id', '=', itemId);

//           console.log(itemInventory);

//       res.status(200).json(itemInventory);
//   } catch (error) {
//       res.status(400).send(`Error retrieving Inventories: ${error}`);
//   }
// }



const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`,
    });
  }
};

const update = async (req, res) => {
  if (
    !req.body.category ||
    !req.body.description ||
    !req.body.item_name ||
    !req.body.quantity ||
    !req.body.status ||
    !req.body.warehouse_id
  ) {
    return res.status(400).json({
      message: "Unsuccessful because of missing properties in the request body",
    });
  }

  if (!Number.isInteger(req.body.quantity)) {
    return res.status(400).json({
      message: "quantity is not a number",
    });
  }

  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });

    if (warehousesFound.length === 0) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.body.warehouse_id}`,
    });
  }

  try {
    const rowsUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const updatedInventory = await knex("inventories").where({
      id: req.params.id,
    });

    res.json(updatedInventory[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  add,
  findOne,
  index,
  remove,
  update,
};
