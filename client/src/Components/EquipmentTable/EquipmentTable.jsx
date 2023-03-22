import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({
  equipments,
  onDelete,
  onTypeChange,
  onNameChange,
  onSortByName,
  onSortByType,
  onSortByAmount,
}) => (
  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>
            <div onClick={onSortByName}>Name</div>
            <input onChange={onNameChange}></input>
          </th>
          <th>
            <div onClick={onSortByType}>Type</div>
            <input onChange={onTypeChange}></input>
          </th>

          <th>
            <div onClick={onSortByAmount}>Amount</div>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipments.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/updateEquipment/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
