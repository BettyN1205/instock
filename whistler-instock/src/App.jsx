import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import EditInventory from "./components/EditInventory/EditInventory.jsx";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import InventoryList from "./components/InventoryList/InventoryList";
import Navigation from "./components/Navigation/Navigation";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import AddInventory from "./components/AddInventory/AddInventory";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";

import Warehouses from "./pages/Warehouses/Warehouses.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouses/:id" element={<WarehouseDetails />} />
            <Route path="/warehouses/:id/edit" element={<EditWarehouse />} />
            <Route path="/warehouses/add" element={<AddNewWarehouse />} />
            {/* <Route path="/warehouses/:id/delete" element={} /> */}

            <Route path="/inventories" element={<InventoryList />} />
            <Route path="/inventories/add" element={<AddInventory />} />
            <Route path="/inventories/:id" element={<InventoryItemDetails />} />
            <Route path="/inventories/:id/edit" element={<EditInventory />} />
            {/*<Route path="/inventories/:id/delete" element={} /> */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
