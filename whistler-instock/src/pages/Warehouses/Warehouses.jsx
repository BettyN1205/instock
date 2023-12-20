import "./Warehouses.scss";

import deleteOutlineIcon from "./../../assets/icons/delete_outline-24px.svg";
import editIcon from "./../../assets/icons/edit-24px.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Warehouses() {
  const { VITE_API_URL: apiUrl } = import.meta.env;

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const { data } = await axios.get(`${apiUrl}/warehouses`);
      setWarehouses(data);
    };

    fetchWarehouses();
  }, []);

  if (warehouses) {
    return (
      <section className="warehouses">
        <header className="warehouses-header">
          <h1 className="warehouses-header__heading">Warehouses</h1>
          <input
            className="warehouses-header__search"
            placeholder="Search..."
            type="search"
          />
          <Link className="warehouses-header__button" to="/warehouses/add">
            + Add New Warehouse
          </Link>
        </header>

        <table className="warehouses-table">
          <thead>
            <tr>
              <th className="warehouses-table__th">Warehouse</th>
              <th className="warehouses-table__th">Address</th>
              <th className="warehouses-table__th">Contact Name</th>
              <th className="warehouses-table__th">Contact Information</th>
              <th className="warehouses-table__th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td className="warehouses-table__td">
                  <Link
                    className="warehouses-table__link"
                    to={`/warehouses/${warehouse.id}`}
                  >
                    {warehouse.warehouse_name}
                  </Link>
                </td>
                <td className="warehouses-table__td">{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</td>
                <td className="warehouses-table__td">
                  {warehouse.contact_name}
                </td>
                <td className="warehouses-table__td">
                  {warehouse.contact_email}
                  <br />
                  {warehouse.contact_phone}
                </td>
                <td className="warehouses-table__td ">
                  <div className="warehouses-table__actions">
                    <Link to={`/warehouses/${warehouse.id}/edit`}>
                      <img alt="Edit icon" src={editIcon} />
                    </Link>
                    <Link to={`/warehouses/${warehouse.id}/delete`}>
                      <img alt="Delete icon" src={deleteOutlineIcon} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Warehouses;
