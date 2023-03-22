import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch(`/api/equipments/`).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch("/api/brands/").then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchBrands().then((brands) => {
      setBrands(brands);
      fetchEquipments().then((equipments) => {
        setEquipments(equipments);
        setEmployeeLoading(false);
      });
    });
  }, []);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      brands={brands}
      equipments={equipments}
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
