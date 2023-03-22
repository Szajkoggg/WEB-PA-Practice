import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./EmployeeTable.css";

const EmployeeTable = ({
  employees,
  onDelete,
  onLevelChange,
  onPositionChange,
  onNameChange,
  onSortByFirstName,
  onSortByLastName,
  onSortByLevel,
  onSortByPosition,
  onSortByPresent,
  onPresent,
  today,
  onSortByEquipment,
  onEquipmentChange,
  onSortByBrand,
  onBrandChange,
}) => {
  const data = employees;
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentEmployees(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              <div>
                Name<span onClick={onSortByFirstName}> (FirstName</span>/
                <span onClick={onSortByLastName}>LastName)</span>
              </div>
              <input onChange={onNameChange}></input>
            </th>
            <th>
              <div onClick={onSortByLevel}>Level</div>
              <input onChange={onLevelChange}></input>
            </th>
            <th>
              <div onClick={onSortByPosition}>Position</div>
              <input onChange={onPositionChange}></input>
            </th>
            <th>
              <div onClick={onSortByEquipment}>Equipment</div>
              <input onChange={onEquipmentChange}></input>
            </th>
            <th>
              <div onClick={onSortByBrand}>Favorite Brand</div>
              <input onChange={onBrandChange}></input>
            </th>
            <th>
              <div>Update/Delete</div>
            </th>
            <th>
              <div onClick={onSortByPresent}>Present</div>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => {
            let date = today();
            return (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>{employee.equipment}</td>
                <td>{employee.brand.name}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  {employee.present.includes(date) ? (
                    <input
                      type="checkbox"
                      onChange={() => onPresent(employee)}
                      defaultChecked
                    ></input>
                  ) : (
                    <input
                      type="checkbox"
                      onChange={() => onPresent(employee)}
                    ></input>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default EmployeeTable;
