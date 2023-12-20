import "./EditWarehouse.scss";

import validator from "validator";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import arrowBackIcon from "./../../assets/icons/arrow_back-24px.svg";

function EditWarehouse() {
  const { VITE_API_URL: apiUrl } = import.meta.env;
  const params = useParams();

  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      const { data } = await axios.get(`${apiUrl}/warehouses/${params.id}`);
      setWarehouse(data);
    };

    fetchWarehouse();
  }, []);

  const getFormFields = (fields) => {
    return fields.map((field) => (
      <div className="edit-warehouse-form__field" key={field.inputId}>
        <label className="edit-warehouse-form__label" htmlFor={field.inputId}>
          {field.labelText}
        </label>
        <input
          className="edit-warehouse-form__input edit-warehouse-form__input"
          id={field.inputId}
          placeholder={field.labelText}
          type={field.inputType}
          value={field.value}
        />
      </div>
    ));
  };

  const handleEditWarehouse = async (e) => {
    e.preventDefault();

    let isValidForm = true;

    for (const element of e.target.elements) {
      if (!element.value) {
        element.classList.add("edit-warehouse-form__input--error");
        isValidForm = false;
      } else {
        element.classList.remove("edit-warehouse-form__input--error");
      }

      if (element.type === "email") {
        if (!validator.isEmail(element.value)) {
          element.classList.add("edit-warehouse-form__input--error");
          isValidForm = false;
        } else {
          element.classList.remove("edit-warehouse-form__input--error");
        }
      }

      if (element.type === "tel") {
        if (!validator.isMobilePhone(element.value)) {
          element.classList.add("edit-warehouse-form__input--error");
          isValidForm = false;
        } else {
          element.classList.remove("edit-warehouse-form__input--error");
        }
      }

      if (isValidForm) {
        try {
          await axios.put(`${apiUrl}/warehouses/${warehouse.id}`);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (warehouse) {
    const warehouseDetails = [
      {
        inputId: "warehouse-name",
        inputType: "text",
        labelText: "Warehouse Name",
        value: warehouse.warehouse_name,
      },
      {
        inputId: "street-address",
        inputType: "text",
        labelText: "Sreet Address",
        value: warehouse.address,
      },
      {
        inputId: "city",
        inputType: "text",
        labelText: "City",
        value: warehouse.city,
      },
      {
        inputId: "country",
        inputType: "text",
        labelText: "Country",
        value: warehouse.country,
      },
    ];

    const contactDetails = [
      {
        inputId: "contact-name",
        inputType: "text",
        labelText: "Contact Name",
        value: warehouse.contact_name,
      },
      {
        inputId: "position",
        inputType: "text",
        labelText: "Position",
        value: warehouse.contact_position,
      },
      {
        inputId: "phone",
        inputType: "tel",
        labelText: "Phone",
        value: warehouse.contact_phone,
      },
      {
        inputId: "email",
        inputType: "email",
        labelText: "Email",
        value: warehouse.contact_email,
      },
    ];

    return (
      <section className="edit-warehouse">
        <h1 className="edit-warehouse__page-header">
          <Link to={"/"} className="edit-warehouse__page-header-icon">
            <img src={arrowBackIcon} />
          </Link>
          Edit Warehouse
        </h1>

        <form className="edit-warehouse-form" onSubmit={handleEditWarehouse}>
          <div className="edit-warehouse-form__section edit-warehouse-form__section--warehouse-details">
            <h2 className="edit-warehouse-form__header">Warehouse Details</h2>

            {getFormFields(warehouseDetails)}
          </div>

          <div className="edit-warehouse-form__section edit-warehouse-form__section--contact-details">
            <h2 className="edit-warehouse-form__header">Contact Details</h2>

            {getFormFields(contactDetails)}
          </div>

          <div className="edit-warehouse-form__section edit-warehouse-form__section--buttons">
            <input
              className="edit-warehouse-form__button edit-warehouse-form__button--secondary"
              type="button"
              value="Cancel"
            />
            <input
              className="edit-warehouse-form__button edit-warehouse-form__button--primary"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </section>
    );
  }
}

export default EditWarehouse;
