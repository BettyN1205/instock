import "./EditInventory.scss";

import validator from "validator";

import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrowBackIcon from "./../../assets/icons/arrow_back-24px.svg";

function EditInventory() {
  const { VITE_API_URL: apiUrl } = import.meta.env;
  const params = useParams();

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const { data } = await axios.get(`${apiUrl}/inventories/${params.id}`);
      setInventory(data);
    };

    fetchInventory();
  }, []);

  const getFormField = (field) => {
    if (field.elementType === "input" && field.inputType === "text") {
      return (
        <input
          className="edit-inventory-form__input"
          id={field.inputId}
          placeholder={field.labelText}
          type={field.inputType}
          value={field.value}
        />
      );
    } else if (field.elementType === "input" && field.inputType === "radio") {
      return (
        <div className="edit-inventory-form__radio-container">
          {field.options.map((option) => {
            return (
              <div className="edit-inventory-form__radio" key="">
                <input id={option.optionId} name={field.inputId} type="radio" />
                <label htmlFor={option.inputId}>{option.labelText}</label>
              </div>
            );
          })}
        </div>
      );
    } else if (field.elementType === "select") {
      return (
        <select
          className="edit-inventory-form__select"
          id={field.inputId}
          type={field.inputType}
        >
          {field.options.map((option) => (
            <option key="" value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (field.elementType === "textarea") {
      return (
        <textarea
          className="edit-inventory-form__textarea"
          id={field.inputId}
          placeholder={field.labelText}
          type={field.inputType}
          value={field.value}
        ></textarea>
      );
    }
  };

  const getFormFields = (fields) => {
    return fields.map((field) => (
      <div className="edit-inventory-form__field" key={field.inputId}>
        <label className="edit-inventory-form__label" htmlFor={field.inputId}>
          {field.labelText}
        </label>
        {getFormField(field)}
      </div>
    ));
  };

  const itemDetails = [
    {
      elementType: "input",
      inputId: "item-name",
      inputType: "text",
      labelText: "Item Name",
      value: inventory.item_name,
    },
    {
      elementType: "textarea",
      inputId: "description",
      labelText: "Description",
      value: inventory.description,
    },
    {
      elementType: "select",
      inputId: "category",
      labelText: "Category",
      options: [inventory.category],
    },
  ];

  const itemAvailability = [
    {
      elementType: "input",
      inputId: "status",
      inputType: "radio",
      labelText: "Status",
      options: [
        { inputId: "in-stock", labelText: "In stock" },
        { inputId: "out-of-stock", labelText: "Out of stock" },
      ],
    },
    {
      elementType: "select",
      inputId: "warehouse",
      labelText: "Warehouse",
      options: [inventory.warehouse_id],
    },
  ];

  const handleEditInventory = async (e) => {
    e.preventDefault();

    await axios.put(`${apiUrl}/inventories/${inventory.id}`, {
      category: e.target.category.value,
      description: e.target.description.value,
      item_name: e.target["item-name"].value,
      quantity: e.target.quantity.value,
      status: e.target.status.value,
      warehouse_id: e.target.warehouse.value,
    });
  };

  return (
    <section className="edit-inventory">
      <h1 className="edit-inventory__page-header">
        <Link to={"/inventories"} className="edit-inventory__page-header-icon">
          <img src={arrowBackIcon} />
        </Link>
        Edit Inventory Item
      </h1>

      <form className="edit-inventory-form" onSubmit={handleEditInventory}>
        <div className="edit-inventory-form__section edit-inventory-form__section--warehouse-details">
          <h2 className="edit-inventory-form__header">Item Details</h2>

          {getFormFields(itemDetails)}
        </div>

        <div className="edit-inventory-form__section edit-inventory-form__section--contact-details">
          <h2 className="edit-inventory-form__header">Item Availability</h2>

          {getFormFields(itemAvailability)}
        </div>

        <div className="edit-inventory-form__section edit-inventory-form__section--buttons">
          <input
            className="edit-inventory-form__button edit-inventory-form__button--secondary"
            type="button"
            value="Cancel"
          />
          <input
            className="edit-inventory-form__button edit-inventory-form__button--primary"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </section>
  );
}

export default EditInventory;
