const inventoriesData = require("./../seed-data/inventories");
const warehousesData = require("./../seed-data/warehouses");

exports.seed = async function (knex) {
  await knex("inventories").del();
  await knex("warehouses").del();
  await knex("warehouses").insert(warehousesData);
  await knex("inventories").insert(inventoriesData);
};
