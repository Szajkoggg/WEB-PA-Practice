const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  brands,
  onCancel,
  equipments,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select
          defaultValue={employee ? employee.equipment : null}
          name="equipment"
          id="equipment"
        >
          <option key="none" value="None">
            None
          </option>
          {equipments.map((equipment, index) => {
            return (
              <option key={index} value={equipment.name}>
                {equipment.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="control">
        <label htmlFor="brand">Favorite Brand:</label>
        <select
          defaultValue={employee ? employee.brand : null}
          name="brand"
          id="brand"
        >
          {brands.map((brand, index) => {
            return (
              <option key={index} value={brand._id}>
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
