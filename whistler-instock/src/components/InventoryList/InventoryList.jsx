import "./InventoryList.scss";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import searchIcon from "../../assets/icons/search-24px.svg";
import InventoryListCard from "../InventoryListCard/InventoryListCard";
import Dialog from "@mui/material/Dialog";
import closeIcon from "../../assets/icons/close-24px.svg";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InventoryList = () => {
  const [inventoryList, setInventoryList] = useState([]);

  const [itemToDelete, setItemToDelete] = useState();

  const getList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventories");
      setInventoryList(response.data);
    } catch (error) {
      console.error("Error fetching inventory list:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/inventories/${id}`
      );
      getList();
      setItemToDelete();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Dialog onClose={() => setItemToDelete()} open={!!itemToDelete}>
        <h1>Delete {itemToDelete?.item_name} inventory item?</h1>
        <button
          className="inventory__close-button"
          onClick={() => setItemToDelete()}
        >
          <img src={closeIcon} alt="close-icon" />
        </button>

        <h2>
          Please confirm that you’d like to delete Television from the inventory
          list. You won’t be able to undo this action.
        </h2>
        <div className="inventory__buttons-container">
          <button
            className="inventory__cancel-button"
            onClick={() => setItemToDelete()}
          >
            Cancel
          </button>

          <button
            className="inventory__delete-button"
            onClick={() => deleteItem(itemToDelete?.id)}
          >
            Delete
          </button>
        </div>
      </Dialog>
      <section className="inventory">
        <div className="inventory__nav">
          <h1 className="inventory__title">Inventory</h1>
          <div className="inventory__nav-search">
            <div className="inventory__nav-search-container">
              <input
                className="inventory__nav-search-input"
                type="text"
                placeholder="Search..."
              />
              <img
                className="inventory__nav-search-icon"
                src={searchIcon}
                alt="search-icon"
              />
            </div>

            {/*to do fix stylez*/}
            <Link to="/inventories/add">
              <button className="inventory__nav-search-button">
                + Add New Item
              </button>
            </Link>
          </div>
        </div>

        <div className="inventory__container">
          <ul className="inventory__sort">
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">inventory item</h4>
              <img
                className="inventory__sort-icon"
                src={sortIcon}
                alt="sortIcon"
              />
            </li>
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">category</h4>
              <img
                className="inventory__sort-icon"
                src={sortIcon}
                alt="sortIcon"
              />
            </li>
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">Status</h4>
              <img
                className="inventory__sort-icon"
                src={sortIcon}
                alt="sortIcon"
              />
            </li>
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">Qty</h4>
              <img
                className="inventory__sort-icon"
                src={sortIcon}
                alt="sortIcon"
              />
            </li>
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">warehouse</h4>
              <img
                className="inventory__sort-icon"
                src={sortIcon}
                alt="sortIcon"
              />
            </li>
            <li className="inventory__sort-li">
              <h4 className="inventory__sort-heading">actions</h4>
            </li>
          </ul>
          {/* ---------------- */}

          {inventoryList?.map((item) => (
            <ul className="inventory__list" key={item.id}>
              <Link to={`/inventories/${item.id}`}>
                <li className="inventory__list-li product">
                  {item.item_name} &gt;
                </li>
              </Link>

              <li className="inventory__list-li">{item.category} </li>
              <li
                className={`inventory__list-li inventory__list-stock ${
                  item.status.toLowerCase() === "out of stock"
                    ? "out-of-stock"
                    : ""
                }`}
              >
                {item.status}
              </li>

              <li className="inventory__list-li inventory__list-quantity">
                {item.quantity}
              </li>
              <li className="inventory__list-li inventory__list-location">
                {item.warehouse_name}
              </li>
              <li className="inventory__list-li inventory__list-actions">
                <Link to={`/inventories/${item.id}/delete`}>
                  <img
                    src={deleteIcon}
                    className="inventory__deleteIcon"
                    alt="deleteIcon"
                    onClick={() => setItemToDelete(item)}
                  />
                </Link>
                <Link to={`/inventories/${item.id}/edit`}>
                  <img
                    src={editIcon}
                    className="inventory__editIcon"
                    alt="editIcon"
                  />
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </section>

      <InventoryListCard inventoryList={inventoryList} />
    </>
  );
};
export default InventoryList;
