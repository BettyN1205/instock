/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("warehouses", (table) => {
      table.increments("id").primary();
      table.string("address").notNullable();
      table.string("city").notNullable();
      table.string("contact_email").notNullable();
      table.string("contact_name").notNullable();
      table.string("contact_phone").notNullable();
      table.string("contact_position").notNullable();
      table.string("country").notNullable();
      table.string("warehouse_name").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("inventories", (table) => {
      table.increments("id").primary();
      table.integer("quantity").notNullable();
      table
        .integer("warehouse_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .references("warehouses.id")
        .unsigned();
      table.string("category").notNullable();
      table.string("description").notNullable();
      table.string("item_name").notNullable();
      table.string("status").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("inventories").dropTable("warehouses");
};
