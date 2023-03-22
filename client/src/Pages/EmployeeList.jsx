import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import Alert from "../Components/Alert";

/* const fetchEmployeesSearch = (name) => {
  return fetch(`/api/employees/search/${name}`).then((res) => res.json());
};
 */
const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const { search: searchURL } = useParams();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [levelFilteredEmployees, setLevelFilteredEmployees] = useState([]);
  const [positionFilteredEmployees, setPositionFilteredEmployees] = useState(
    []
  );
  const [nameFilteredEmployees, setNameFilteredEmployees] = useState([]);
  const [brandFilteredEmployees, setBrandFilteredEmployees] = useState([]);
  const [urlFilteredEmployees, setURLFilteredEmployees] = useState([]);
  const [equipmentFilteredEmployees, setEquipmentFilteredEmployees] = useState(
    []
  );
  const [levelSearchField, setLevelSearchField] = useState("");
  const [positionSearchField, setPositionSearchField] = useState("");
  const [nameSearchField, setNameSearchField] = useState("");
  const [brandSearchField, setBrandSearchField] = useState("");
  const [equipmentSearchField, setEquipmentSearchField] = useState("");
  const [sortedByFirstName, setSortedByFirstName] = useState(null);
  const [sortedByLastName, setSortedByLastName] = useState(null);
  const [sortedByLevel, setSortedByLevel] = useState(null);
  const [sortedByPosition, setSortedByPosition] = useState(null);
  const [sortedByPresent, setSortedByPresent] = useState(null);
  const [sortedByEquipment, setSortedByEquipment] = useState(null);
  const [sortedByBrand, setSortedByBrand] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = () => {
    deleteEmployee(idToDelete);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== idToDelete);
    });
    setIdToDelete(null);
    setFilteredEmployees(employees);
  };

  const handleSelectDelete = (id) => {
    setIdToDelete(id);
  };

  const handleAlertCancel = () => {
    setIdToDelete(null);
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(employees);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const employeesFilteredByLevel = employees.filter((employee) =>
      employee.level.toLocaleLowerCase().includes(levelSearchField)
    );
    setLevelFilteredEmployees(employeesFilteredByLevel);
  }, [employees, levelSearchField]);

  const handleLevelSearchChange = (event) => {
    const levelSearchFieldString = event.target.value.toLocaleLowerCase();
    setLevelSearchField(levelSearchFieldString);
  };

  useEffect(() => {
    const employeesFilteredByPosition = employees.filter((employee) =>
      employee.position.toLocaleLowerCase().includes(positionSearchField)
    );
    setPositionFilteredEmployees(employeesFilteredByPosition);
  }, [employees, positionSearchField]);

  const handlePositionSearchChange = (event) => {
    const positionSearchFieldString = event.target.value.toLocaleLowerCase();
    setPositionSearchField(positionSearchFieldString);
  };

  useEffect(() => {
    const employeesFilteredByEquipment = employees.filter((employee) =>
      employee.equipment.toLocaleLowerCase().includes(equipmentSearchField)
    );
    setEquipmentFilteredEmployees(employeesFilteredByEquipment);
  }, [employees, equipmentSearchField]);

  const handleEquipmentSearchChange = (event) => {
    const equipmentSearchFieldString = event.target.value.toLocaleLowerCase();
    setEquipmentSearchField(equipmentSearchFieldString);
  };

  useEffect(() => {
    const employeesFilteredByBrand = employees.filter((employee) =>
      employee.brand.name.toLocaleLowerCase().includes(brandSearchField)
    );
    setBrandFilteredEmployees(employeesFilteredByBrand);
  }, [employees, brandSearchField]);

  const handleBrandSearchChange = (event) => {
    const brandSearchFieldString = event.target.value.toLocaleLowerCase();
    setBrandSearchField(brandSearchFieldString);
  };

  useEffect(() => {
    const employeesFilteredByName = employees.filter((employee) =>
      employee.name.toLocaleLowerCase().includes(nameSearchField)
    );
    setNameFilteredEmployees(employeesFilteredByName);
  }, [employees, nameSearchField]);

  const handleNameSearchChange = (event) => {
    const nameSearchFieldString = event.target.value.toLocaleLowerCase();
    setNameSearchField(nameSearchFieldString);
  };

  useEffect(() => {
    if (searchURL) {
      const employeesFilteredByURL = employees.filter((employee) =>
        employee.name
          .toLocaleLowerCase()
          .includes(searchURL.toLocaleLowerCase())
      );
      setURLFilteredEmployees(employeesFilteredByURL);
    } else {
      setURLFilteredEmployees(employees);
    }
  }, [employees, searchURL]);

  useEffect(() => {
    const filteredByAll = [...employees].filter((employee) => {
      return (
        positionFilteredEmployees.includes(employee) &&
        levelFilteredEmployees.includes(employee) &&
        nameFilteredEmployees.includes(employee) &&
        equipmentFilteredEmployees.includes(employee) &&
        brandFilteredEmployees.includes(employee) &&
        urlFilteredEmployees.includes(employee)
      );
    });
    setFilteredEmployees(filteredByAll);
  }, [
    levelFilteredEmployees,
    positionFilteredEmployees,
    nameFilteredEmployees,
    equipmentFilteredEmployees,
    brandFilteredEmployees,
    urlFilteredEmployees,
    employees,
  ]);

  const handleSortByFirstName = () => {
    if (sortedByFirstName !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
        )
      );
      setSortedByFirstName("ascending");
      setSortedByLastName(null);
      setSortedByPosition(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
    } else if (sortedByFirstName !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          b.name.split(" ")[0].localeCompare(a.name.split(" ")[0])
        )
      );
      setSortedByFirstName("descending");
      setSortedByLastName(null);
      setSortedByPosition(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
    }
  };

  const handleSortByLastName = () => {
    if (sortedByLastName !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          a.name
            .split(" ")
            [a.name.split(" ").length - 1].localeCompare(
              b.name.split(" ")[b.name.split(" ").length - 1]
            )
        )
      );
      setSortedByLastName("ascending");
      setSortedByPosition(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
    } else if (sortedByLastName !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          b.name
            .split(" ")
            [b.name.split(" ").length - 1].localeCompare(
              a.name.split(" ")[a.name.split(" ").length - 1]
            )
        )
      );
      setSortedByLastName("descending");
      setSortedByFirstName(null);
      setSortedByPosition(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
    }
  };

  const handleSortByLevel = () => {
    if (sortedByLevel !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) => a.level.localeCompare(b.level))
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByLevel("ascending");
    } else if (sortedByLevel !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) => b.level.localeCompare(a.level))
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByLevel("descending");
    }
  };

  const handleSortByPosition = () => {
    if (sortedByPosition !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          a.position.localeCompare(b.position)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByPosition("ascending");
    } else if (sortedByPosition !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          b.position.localeCompare(a.position)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByPosition("descending");
    }
  };

  const todayDate = () => {
    let d = new Date();
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  const handlePresent = (employee) => {
    let date = todayDate();
    if (Object.hasOwn(employee, "present")) {
      if (!employee.present.includes(date)) {
        employee.present.push(date);
      } else {
        const index = employee.present.indexOf(date);
        employee.present.splice(index, 1);
      }
    } else {
      employee.present = [date];
    }
    fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };

  const handleSortByPresent = () => {
    if (sortedByPresent !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort(
          (a, b) =>
            a.present.includes(todayDate()) - b.present.includes(todayDate())
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByPresent("ascending");
    } else if (sortedByPresent !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort(
          (a, b) =>
            b.present.includes(todayDate()) - a.present.includes(todayDate())
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByEquipment(null);
      setSortedByBrand(null);
      setSortedByPresent("descending");
    }
  };

  const handleSortByEquipment = () => {
    if (sortedByEquipment !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          a.equipment.localeCompare(b.equipment)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByBrand(null);
      setSortedByEquipment("ascending");
    } else if (sortedByEquipment !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          b.equipment.localeCompare(a.equipment)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByBrand(null);
      setSortedByEquipment("descending");
    }
  };

  const handleSortByBrand = () => {
    if (sortedByBrand !== "ascending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          a.brand.name.localeCompare(b.brand.name)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand("ascending");
    } else if (sortedByBrand !== "descending") {
      setFilteredEmployees(
        [...filteredEmployees].sort((a, b) =>
          b.brand.name.localeCompare(a.brand.name)
        )
      );
      setSortedByLastName(null);
      setSortedByFirstName(null);
      setSortedByLevel(null);
      setSortedByPosition(null);
      setSortedByPresent(null);
      setSortedByEquipment(null);
      setSortedByBrand("descending");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <EmployeeTable
        employees={filteredEmployees}
        onDelete={handleSelectDelete}
        onLevelChange={handleLevelSearchChange}
        onPositionChange={handlePositionSearchChange}
        onNameChange={handleNameSearchChange}
        onSortByFirstName={handleSortByFirstName}
        onSortByLastName={handleSortByLastName}
        onSortByLevel={handleSortByLevel}
        onSortByPosition={handleSortByPosition}
        onSortByPresent={handleSortByPresent}
        onPresent={handlePresent}
        today={todayDate}
        onSortByEquipment={handleSortByEquipment}
        onEquipmentChange={handleEquipmentSearchChange}
        onSortByBrand={handleSortByBrand}
        onBrandChange={handleBrandSearchChange}
      />
      {idToDelete && (
        <Alert
          onConfirm={handleDelete}
          onCancel={handleAlertCancel}
          text="Are you sure you want to delete?"
        />
      )}
    </Fragment>
  );
};

export default EmployeeList;
