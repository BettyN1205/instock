import "./WarehouseDetails.scss";
import edit from "../../assets/icons/edit-24px.svg";
import back from "../../assets/icons/arrow_back-24px.svg";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WarehouseDetails() {
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

  if (warehouse) {
    return (
      <div className="warehouses">
        <section className="warehouses__header">
          <div className="warehouses__header-container">
            <div className="warehouses__header-subcontainer">
              <Link to="/warehouses">
                <img src={back} alt="back icon" className="warehouses__icons" />
              </Link>
              <h2 className="warehouses__header-text">
                {warehouse.warehouse_name}
              </h2>
            </div>

            <Link
              to={`/warehouses/${warehouse.id}/edit`}
              className="warehouses__header-bg"
            >
              <img
                src={edit}
                alt="edit icon"
                className="warehouses__header__icons--edit"
              />
              <span className="warehouses__header-edit-text">Edit</span>
            </Link>
          </div>
        </section>
        <section className="warehouses__info">
          <div className="warehouses__info-address">
            <h4 className="warehouses__info-subheaders">WAREHOUSE ADDRESS:</h4>
            <p className="warehouses__info-text">
              {warehouse.address}, {warehouse.city}, {warehouse.country}
            </p>
          </div>
          <div className="warehouses__info-contact">
            <div className="warehouses__info-col--left">
              <h4 className="warehouses__info-subheaders">CONTACT NAME:</h4>
              <p className="warehouses__info-text">{warehouse.contact_name}</p>
              <p className="warehouses__info-text">
                {warehouse.contact_position}
              </p>
            </div>
            <div className="warehouses__info-col--right">
              <h4 className="warehouses__info-subheaders">
                CONTACT INFORMATION:
              </h4>
              <p className="warehouses__info-text">{warehouse.contact_phone}</p>
              <p className="warehouses__info-text">{warehouse.contact_email}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
