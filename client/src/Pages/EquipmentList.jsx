import { Fragment, useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";
import Alert from "../Components/Alert";

const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => {
    return res.json();
  });
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [typeFilteredEquipments, setTypeFilteredEquipments] = useState([]);
  const [nameFilteredEquipments, setNameFilteredEquipments] = useState([]);
  const [typeSearchField, setTypeSearchField] = useState("");
  const [nameSearchField, setNameSearchField] = useState("");
  const [sortedByName, setSortedByName] = useState(null);
  const [sortedByType, setSortedByType] = useState(null);
  const [sortedByAmount, setSortedByAmount] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(idToDelete);

    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== idToDelete);
    });
    setIdToDelete(null);
    setFilteredEquipments(equipments);
  };

  const handleSelectDelete = (id) => {
    setIdToDelete(id);
  };

  const handleAlertCancel = () => {
    setIdToDelete(null);
  };

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setLoading(false);
      setEquipments(equipments);
    });
  }, []);

  useEffect(() => {
    const equipmentsFilteredByName = equipments.filter((equipment) =>
      equipment.name.toLocaleLowerCase().includes(nameSearchField)
    );
    setNameFilteredEquipments(equipmentsFilteredByName);
  }, [equipments, nameSearchField]);

  const handleNameSearchChange = (event) => {
    const nameSearchFieldString = event.target.value.toLocaleLowerCase();
    setNameSearchField(nameSearchFieldString);
  };

  useEffect(() => {
    const equipmentsFilteredByType = equipments.filter((equipment) =>
      equipment.type.toLocaleLowerCase().includes(typeSearchField)
    );
    setTypeFilteredEquipments(equipmentsFilteredByType);
  }, [equipments, typeSearchField]);

  const handleTypeSearchChange = (event) => {
    const typeSearchFieldString = event.target.value.toLocaleLowerCase();
    setTypeSearchField(typeSearchFieldString);
  };

  useEffect(() => {
    const filteredByTypeAndName = [...equipments].filter((equipment) => {
      return (
        typeFilteredEquipments.includes(equipment) &&
        nameFilteredEquipments.includes(equipment)
      );
    });
    setFilteredEquipments(filteredByTypeAndName);
  }, [typeFilteredEquipments, nameFilteredEquipments, equipments]);

  const handleSortByName = () => {
    if (sortedByName !== "ascending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => a.name.localeCompare(b.name))
      );
      setSortedByType(null);
      setSortedByAmount(null);
      setSortedByName("ascending");
    } else if (sortedByName !== "descending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => b.name.localeCompare(a.name))
      );
      setSortedByType(null);
      setSortedByAmount(null);
      setSortedByName("descending");
    }
  };

  const handleSortByType = () => {
    if (sortedByType !== "ascending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => a.type.localeCompare(b.type))
      );
      setSortedByType("ascending");
      setSortedByAmount(null);
      setSortedByName(null);
    } else if (sortedByType !== "descending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => b.type.localeCompare(a.type))
      );
      setSortedByType("descending");
      setSortedByAmount(null);
      setSortedByName(null);
    }
  };

  const handleSortByAmount = () => {
    if (sortedByAmount !== "ascending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => a.amount - b.amount)
      );
      setSortedByType(null);
      setSortedByAmount("ascending");
      setSortedByName(null);
    } else if (sortedByAmount !== "descending") {
      setFilteredEquipments(
        [...filteredEquipments].sort((a, b) => b.amount - a.amount)
      );
      setSortedByType(null);
      setSortedByAmount("descending");
      setSortedByName(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <EquipmentTable
        equipments={filteredEquipments}
        onDelete={handleSelectDelete}
        onTypeChange={handleTypeSearchChange}
        onNameChange={handleNameSearchChange}
        onSortByName={handleSortByName}
        onSortByType={handleSortByType}
        onSortByAmount={handleSortByAmount}
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

export default EquipmentList;
