require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

const inventoriesRoutes = require("./routes/inventories-routes");
app.use("/api/inventories", inventoriesRoutes);

const warehousesRoutes = require("./routes/warehouses-routes");
app.use("/api/warehouses", warehousesRoutes);

app.listen(port, () => {
  console.clear();
  console.log(`InStock API running on http://localhost:${port}`);
});
