import "./Navigation.scss";


import { Link, NavLink } from "react-router-dom";

import inStockLogo from "./../../assets/logos/InStock-Logo.svg";

function Navigation() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          <img alt="InStock logo" className="nav__logo" src={inStockLogo} />
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/warehouses"
            >
              Warehouses
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/inventories"
            >
              Inventory
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
