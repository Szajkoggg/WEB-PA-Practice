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
    console.log(brands);
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      console.log(entry);
      let [k, v] = entry;
      if (k === "brand") {
        let currentBrand = brands.filter((brand) => brand.name === v);
        v = currentBrand[0]._id;
      }
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
          <option key="none" defaultValue="None">
            None
          </option>
          {equipments.map((equipment, index) => {
            return (
              <option key={index} defaultValue={equipment.name}>
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
              <option key={index} defaultValue={brand._id}>
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="control">
        <label htmlFor="startingdate">Starting Date:</label>
        <input
          type="date"
          min="2017-01-01"
          max="2030-01-01"
          defaultValue={employee ? employee.startingdate : null}
          name="startingdate"
          id="startingdate"
        ></input>
      </div>
      <div className="control">
        <label htmlFor="salary.current">Salary:</label>
        <input
          type="number"
          defaultValue={employee ? employee.salary.current : null}
          name="salary.current"
          id="salary.current"
          min="300000"
          step="10000"
        />
      </div>
      <div className="control">
        <label htmlFor="salary.desired">Desired Salary:</label>
        <input
          type="number"
          defaultValue={employee ? employee.salary.desired : null}
          name="salary.desired"
          id="dsalary.desired"
          min="350000"
          step="10000"
        />
      </div>
      <div className="control">
        <label htmlFor="color">Favorite Color:</label>
        <input
          type="color"
          defaultValue={employee ? employee.color : "#ffffff"}
          name="color"
          id="color"
        />
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
