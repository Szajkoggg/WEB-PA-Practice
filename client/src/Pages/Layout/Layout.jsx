import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li className="grow">
            <Link to="/equipment">Equipment</Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search employee"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/employees/${e.target.value}`);
                }
              }}
            ></input>
          </li>
          <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          </li>
          <li>
            <Link to="/createEquipment">
              <button type="button">Create Equipment</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
